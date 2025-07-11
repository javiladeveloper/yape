import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaProducerService } from '../kafka/kafka-product.service';
import { FraudEvaluatorService } from './services/fraud-evaluator.service';
import { TransactionCreatedEvent } from '../interfaces/transaction-kafka-event.interface';

@Controller()
export class AntifraudController {
  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    private readonly fraudEvaluator: FraudEvaluatorService,
  ) {}

  @MessagePattern('transaction_created')
  async handleTransaction(@Payload() message: TransactionCreatedEvent) {
    const { transactionId, value } = message;

    const status = this.fraudEvaluator.evaluate(value);

    await this.kafkaProducer.emitValidationResult(transactionId, status);
  }
}
