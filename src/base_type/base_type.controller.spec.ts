import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseTypeController } from './base_type.controller';
import { BaseTypeService } from './base_type.service';
import { BaseType } from '../entities/base_type.entity';
import { UserService } from '../user/user.service';
import { Monster } from '../entities/monster.entity';

describe('BaseTypeController', () => {
  let controller: BaseTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseTypeController],
      providers: [
        BaseTypeService,
        {
          provide: getRepositoryToken(BaseType),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Monster),
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BaseTypeController>(BaseTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
