import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseTypeService } from './base_type.service';
import { BaseType } from '../entities/base_type.entity';
import { Monster } from '../entities/monster.entity';

describe('BaseTypeService', () => {
  let service: BaseTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<BaseTypeService>(BaseTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
