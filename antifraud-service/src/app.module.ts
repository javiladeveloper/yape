import { Module } from '@nestjs/common';
import { AntifraudModule } from './antifraud/antifraud.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AntifraudModule,
  ],
})
export class AppModule {}
