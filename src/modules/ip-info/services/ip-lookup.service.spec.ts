import { Test, TestingModule } from '@nestjs/testing';
import { IpLookupService } from './ip-lookup.service';
import { HttpService } from '@nestjs/axios';
import { RedisClient } from 'src/config/redis/redis-client.interface';
import { IpInfo } from '../domain/entities/ip-info.entity';

describe('IpLookupService', () => {
  let service: IpLookupService;
  let httpService: HttpService;
  let redisClient: RedisClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IpLookupService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
            },
          },
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IpLookupService>(IpLookupService);
    httpService = module.get<HttpService>(HttpService);
    redisClient = module.get<RedisClient>('REDIS_CLIENT');
  });

  it('should return cached IP info', async () => {
    const mockIpInfo = new IpInfo();
    jest.spyOn(redisClient, 'get').mockResolvedValue(JSON.stringify(mockIpInfo));

    const result = await service.lookupIp('127.0.0.1');
    expect(result).toEqual(mockIpInfo);
    expect(redisClient.get).toHaveBeenCalledWith('ipInfo:127.0.0.1');
  });

});
