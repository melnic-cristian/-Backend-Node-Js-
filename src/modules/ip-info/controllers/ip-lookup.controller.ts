import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { IpLookupService } from '../services/ip-lookup.service';
import { IpInfo } from '../domain/entities/ip-info.entity';
import { IpValidationPipe } from 'src/common/pipes/ip-validation.pipe';

@Controller('ip-lookup')
export class IpLookupController {
  public constructor(private readonly ipLookupService: IpLookupService) {}

  @Get(':ip')
  public async getIpInfo(
    @Param('ip', IpValidationPipe) ip: string,
    @Res() response: Response,
  ): Promise<Response<IpInfo>> {
    try {
      const res = await this.ipLookupService.lookupIp(ip);

      return response.json(res);
    } catch (error) {
      console.error(error);

     return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Delete('cache/:ip')
  public async removeCache(
    @Param('ip', IpValidationPipe) ip: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      await this.ipLookupService.removeCachedIp(ip);
      response.status(204).send();
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
