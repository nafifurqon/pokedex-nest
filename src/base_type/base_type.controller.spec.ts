import { Test, TestingModule } from '@nestjs/testing';
import { BaseTypeController } from './base_type.controller';
import { BaseTypeService } from './base_type.service';

describe('BaseTypeController', () => {
  let controller: BaseTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseTypeController],
      providers: [BaseTypeService],
    }).compile();

    controller = module.get<BaseTypeController>(BaseTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
