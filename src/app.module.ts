import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        port: configService.get<number>('DB_PORT'),
        name: configService.get('DB_NAME'),
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
