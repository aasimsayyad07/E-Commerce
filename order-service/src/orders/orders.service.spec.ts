import { Test, TestingModule } from '@nestjs/testing';
import { OrdersProducerService } from './ordersProducer.service';

describe('OrdersService', () => {
  let service: OrdersProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersProducerService],
    }).compile();

    service = module.get<OrdersProducerService>(OrdersProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
