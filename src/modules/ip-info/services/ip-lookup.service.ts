import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IpInfo } from '../domain/entities/ip-info.entity';
import { RedisClient } from 'src/config/redis/redis-client.interface';

@Injectable()
export class IpLookupService {
  private readonly IPWHOIS_API = process.env.IPWHOIS_API_URL;
  private readonly CACHE_TTL = parseInt(process.env.CACHE_TTL) || 60;
  private readonly logger = new Logger(IpLookupService.name);
  

  constructor(private readonly httpService: HttpService,@Inject('REDIS_CLIENT') private readonly redisClient: RedisClient) {}
  
  public async lookupIp(userIp: string): Promise<IpInfo> {
    const cacheKey = `ipInfo:${userIp}`;
    const cachedData = await this.redisClient.get(cacheKey);
  
    if (cachedData) {
      this.logger.log(`Cache hit for IP: ${userIp}`);
      return JSON.parse(cachedData);
    }
  
    let ipResult = await IpInfo.findOne({ where: { ip: userIp } });
  
    if (!ipResult) {
      ipResult = new IpInfo();
      try {
        const response = await this.httpService.axiosRef.get(`${this.IPWHOIS_API}${userIp}`);
        const { ip, ...otherData } = response.data;
        ipResult.ip = userIp;
        ipResult.data = otherData;
        await ipResult.save();
      } catch (error) {
        this.logger.error(`Error fetching data for IP: ${userIp}, Error: ${error.message}`);
        throw new Error(`Error fetching data for IP: ${userIp}`);
      }
    }
  
    await this.redisClient.set(cacheKey, JSON.stringify(ipResult), 'EX', this.CACHE_TTL);
    return ipResult;
  }
  

  public async removeCachedIp(ip: string): Promise<void> {
    const cacheKey = `ipInfo:${ip}`;
    try {
      await this.redisClient.del(cacheKey);
       this.logger.log(`Cache cleared for IP: ${ip}`);
    } catch (error) {
      this.logger.error(`Failed to clear cache for IP: ${ip}, Error: ${error.message}`);
      throw new Error(`Error removing cache for IP: ${ip}`);
    }
  }

}
