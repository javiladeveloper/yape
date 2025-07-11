import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
  KafkaOptions,
} from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.getOrThrow<string>('KAFKA_CLIENT_ID'),
        brokers: [configService.getOrThrow<string>('KAFKA_BROKER')],
      },
      consumer: {
        groupId: configService.getOrThrow<string>('KAFKA_CONSUMER_GROUP'),
      },
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kafkaOptions,
  );

  app.enableShutdownHooks();
  await app.listen();
  console.log('🛡️ Antifraud microservice is listening to Kafka...');
}
bootstrap();
