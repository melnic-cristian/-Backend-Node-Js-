import { Module } from '@nestjs/common';
import { IpModule } from '../ip-info/ip-info.module';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/config/postgres/database.module';

@Module({
  imports: [
    IpModule, 
    DatabaseModule,     
    LoggerModule,
    ExceptionsModule,],
})
export class AppModule {}
