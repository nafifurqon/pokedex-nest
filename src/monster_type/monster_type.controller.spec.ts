import { Test, TestingModule } from '@nestjs/testing';
import { MonsterTypeController } from './monster_type.controller';
import { MonsterTypeService } from './monster_type.service';

describe('MonsterTypeController', () => {
  let controller: MonsterTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonsterTypeController],
      providers: [MonsterTypeService],
    }).compile();

    controller = module.get<MonsterTypeController>(MonsterTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
