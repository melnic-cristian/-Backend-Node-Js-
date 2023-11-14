import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpInfo } from '../../modules/ip-info/domain/entities/ip-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [IpInfo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([IpInfo]),
  ],
})
export class DatabaseModule {}
