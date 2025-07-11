import { FraudEvaluatorService } from './fraud-evaluator.service';

describe('FraudEvaluatorService', () => {
  let service: FraudEvaluatorService;

  beforeEach(() => {
    service = new FraudEvaluatorService();
  });

  it('should approve a transaction with value <= 1000', () => {
    expect(service.evaluate(1000)).toBe('approved');
    expect(service.evaluate(999)).toBe('approved');
  });

  it('should reject a transaction with value > 1000', () => {
    expect(service.evaluate(1001)).toBe('rejected');
    expect(service.evaluate(5000)).toBe('rejected');
  });
});
