import { Test, TestingModule } from '@nestjs/testing';
import { BaseTypeService } from './base_type.service';

describe('BaseTypeService', () => {
  let service: BaseTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseTypeService],
    }).compile();

    service = module.get<BaseTypeService>(BaseTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
