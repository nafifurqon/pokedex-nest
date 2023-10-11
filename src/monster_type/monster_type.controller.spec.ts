import { Test, TestingModule } from '@nestjs/testing';
import { MonsterTypeController } from './monster_type.controller';
import { MonsterTypeService } from './monster_type.service';
import { UserService } from '../user/user.service';

describe('MonsterTypeController', () => {
  let controller: MonsterTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonsterTypeController],
      providers: [
        {
          provide: MonsterTypeService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MonsterTypeController>(MonsterTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
