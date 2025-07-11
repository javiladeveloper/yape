import { Module } from '@nestjs/common';
import { AntifraudController } from './antifraud.controller';
import { FraudEvaluatorService } from './services/fraud-evaluator.service';
import { KafkaProducerService } from '../kafka/kafka-product.service';

@Module({
  controllers: [AntifraudController],
  providers: [FraudEvaluatorService, KafkaProducerService],
})
export class AntifraudModule {}
