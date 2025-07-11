import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.getOrThrow('KAFKA_PRODUCER_CLIENT_ID'),
      brokers: [this.configService.getOrThrow('KAFKA_BROKER')],
    });

    this.producer = this.kafka.producer();
  }
  async onModuleInit() {
    await this.producer.connect();
  }

  async emitValidationResult(transactionId: string, status: string) {
    await this.producer.send({
      topic: 'transactions-validated',
      messages: [
        {
          value: JSON.stringify({ transactionId, status }),
        },
      ],
    });

    console.log(`📤 Emitted validation result for ${transactionId}: ${status}`);
  }
}
