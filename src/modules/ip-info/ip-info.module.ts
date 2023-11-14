import { Module } from '@nestjs/common';
import { IpLookupController } from '../ip-info/controllers/ip-lookup.controller';
import { IpLookupService } from '../ip-info/services/ip-lookup.service';
import { HttpModule } from '@nestjs/axios';
import { RedisClientModule } from 'src/config/redis/redis-client.module';

@Module({
  imports: [ HttpModule , RedisClientModule],
  controllers: [IpLookupController],
  providers: [IpLookupService],
})
export class IpModule {}
