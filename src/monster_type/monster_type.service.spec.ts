import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MonsterType } from '../entities/monster_type.entity';
import { MonsterTypeService } from './monster_type.service';

describe('MonsterTypeService', () => {
  let service: MonsterTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonsterTypeService,
        {
          provide: getRepositoryToken(MonsterType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MonsterTypeService>(MonsterTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
