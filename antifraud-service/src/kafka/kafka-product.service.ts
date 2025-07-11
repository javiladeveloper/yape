import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'antifraud-producer',
    brokers: ['localhost:9092'],
  });

  private producer: Producer = this.kafka.producer();

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
