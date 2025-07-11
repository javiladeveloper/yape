import { Injectable } from '@nestjs/common';

@Injectable()
export class FraudEvaluatorService {
  evaluate(value: number): 'approved' | 'rejected' {
    return value > 1000 ? 'rejected' : 'approved';
  }
}
