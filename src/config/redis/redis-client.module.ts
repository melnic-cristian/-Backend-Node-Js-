import { Module, Global, Logger } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { RedisClient } from './redis-client.interface';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (): RedisClient => {
        const redisOptions: RedisOptions = {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        };

        const client: RedisClient = new Redis(redisOptions);

        client.on('connect', () => {
          Logger.log('Connected to Redis', 'RedisClientModule');
        });

        client.on('error', (error) => {
          Logger.error('Error connecting to Redis', error, 'RedisClientModule');
        });

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisClientModule {}
