import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseType } from 'src/entities/base_type.entity';
import { CatchedMonster } from 'src/entities/catched_monster.entity';
import { Monster } from 'src/entities/monster.entity';
import { MonsterType } from 'src/entities/monster_type.entity';
import { Stat } from 'src/entities/stat.entity';
import { UserService } from 'src/user/user.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { MonsterService } from './monster.service';
import { baseTypesStub } from './stubs/base-type.stub';
import { catchedMonstersStub } from './stubs/catch-monster.stub';
import { monsterTypesStub } from './stubs/monster-type.stub';
import {
  inputMonsterStub,
  monstersStub,
  monstersWithCatchStub,
} from './stubs/monsters.stub';
import { statsStub } from './stubs/stat.stub';
import { jwtUserStub } from './stubs/users.stub';

describe('MonsterService', () => {
  let service: MonsterService;

  const mockMonsterRepository = {
    createQueryBuilder: jest.fn(),
    // find is not used by current implementation of findAll (uses query builder)
    find: jest.fn(() => {
      return monstersStub();
    }),
    findOne: jest.fn(() => {
      return monstersStub()[0];
    }),
    create: jest.fn(() => {
      return monstersStub()[0];
    }),
    save: jest.fn(() => {
      return monstersStub()[0];
    }),
  };

  const mockCatchedMonsterRepository = {
    find: jest.fn(() => {
      return catchedMonstersStub();
    }),
    findOneBy: jest.fn(() => {
      return catchedMonstersStub()[0];
    }),
  };

  const mockBaseTypeRepository = {
    findOneBy: jest.fn(() => {
      return baseTypesStub()[0];
    }),
  };

  const mockMonsterTypeRepository = {
    find: jest.fn(() => {
      return monsterTypesStub();
    }),
  };

  const mockStatRepository = {
    create: jest.fn((input) => {
      return {
        ...input,
        id: '36bdc65e-fbcf-4d55-acf6-7a23fb6ce692',
      };
    }),
    save: jest.fn(() => {
      return statsStub()[0];
    }),
    findOneBy: jest.fn(() => {
      return statsStub()[0];
    }),
  };

  beforeAll(async () => {
    // provide a chainable mock query builder used by findAll
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(() => [monstersStub(), monstersStub().length]),
    };
    mockMonsterRepository.createQueryBuilder = jest.fn(() => mockQueryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonsterService,
        {
          provide: getRepositoryToken(Monster),
          useValue: mockMonsterRepository,
        },
        {
          provide: getRepositoryToken(BaseType),
          useValue: mockBaseTypeRepository,
        },
        {
          provide: getRepositoryToken(MonsterType),
          useValue: mockMonsterTypeRepository,
        },
        {
          provide: getRepositoryToken(Stat),
          useValue: mockStatRepository,
        },
        {
          provide: getRepositoryToken(CatchedMonster),
          useValue: mockCatchedMonsterRepository,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MonsterService>(MonsterService);
  });

  beforeEach(() => {
    mockMonsterRepository.find = jest.fn(() => {
      return monstersStub();
    });
    mockBaseTypeRepository.findOneBy = jest.fn(() => {
      return baseTypesStub()[0];
    });
    mockMonsterTypeRepository.find = jest.fn(() => {
      return monsterTypesStub();
    });
    mockMonsterRepository.save = jest.fn(() => {
      return monstersStub()[0];
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call monsterRepository and catchedMonsterRepository', async () => {
      // Action
      const payload = { page: 1, limit: 10 } as any;
      await service.findAll(payload);

      // Assert
      expect(mockMonsterRepository.createQueryBuilder).toBeCalled();
      expect(mockCatchedMonsterRepository.find).toBeCalled();
    });

    it('should return all monsters', async () => {
      // Action
      const payload = { page: 1, limit: 10 } as any;
      const res = await service.findAll(payload);

      // Assert
      expect(res.data[0]).toHaveProperty('id');
      expect(res.data[0]).toHaveProperty('name');
      expect(res.data[0]).toHaveProperty('description');
      expect(res.data[0]).toHaveProperty('baseType');
      expect(res.data[0]).toHaveProperty('monsterTypes');
      // expect(res.data[0]).toHaveProperty('stat');
      expect(res.data[0]).toHaveProperty('catched');
      expect(res.total_data).toBeDefined();
    });

    it('should return all monsters with catched monster', async () => {
      // Arrange
      const userId = jwtUserStub().userId;
      // replace query builder to return monstersWithCatchStub
      mockMonsterRepository.createQueryBuilder = jest.fn(() => {
        return {
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          offset: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          getManyAndCount: jest.fn(() => [
            monstersWithCatchStub(),
            monstersWithCatchStub().length,
          ]),
        } as any;
      });

      // Action
      const payload = { page: 1, limit: 10 } as any;
      const res = await service.findAll(payload, userId);

      // Assert
      expect(res.data[0]).toHaveProperty('catched');
      expect(res.data[0].catched).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return monster by id', async () => {
      // Arrange
      const monsterId = monstersStub()[0].id;

      // Action
      const monster = await service.findOne(monsterId);

      // Assert
      expect(mockMonsterRepository.findOne).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      // expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');
    });

    it('should return monster with catched monster', async () => {
      // Arrange
      const monsterId = monstersStub()[0].id;
      const userId = jwtUserStub().userId;

      // Action
      const monster = await service.findOne(monsterId, userId);

      // Assert
      expect(mockMonsterRepository.findOne).toBeCalled();
      expect(mockCatchedMonsterRepository.findOneBy).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      // expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');

      expect(monster.catched).toBe(true);
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should return created monster', async () => {
      // Arrange
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action
      const monster = await service.create(inputMonster);

      // Assert
      expect(mockBaseTypeRepository.findOneBy).toBeCalled();
      expect(mockMonsterTypeRepository.find).toBeCalled();
      // expect(mockStatRepository.create).toBeCalled();
      // expect(mockStatRepository.save).toBeCalled();
      expect(mockMonsterRepository.create).toBeCalled();
      expect(mockMonsterRepository.save).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      // expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');
    });

    it('should return not found when base type id not found', async () => {
      // Arrange
      mockBaseTypeRepository.findOneBy = jest.fn(() => {
        return null;
      });
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action & Assert
      await expect(service.create(inputMonster)).rejects.toThrowError(
        'Base type not found!',
      );
    });

    it('should return not found when monster type id not found', async () => {
      // Arrange
      mockMonsterTypeRepository.find = jest.fn(() => {
        return [];
      });
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action & Assert
      await expect(service.create(inputMonster)).rejects.toThrowError(
        'Monster type not found!',
      );
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should return updated monster', async () => {
      // Arrange
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';
      const inputMonster: CreateMonsterDto = inputMonsterStub();
      inputMonster.name = 'Updated name';
      inputMonster.description = 'Updated descriptiion';

      mockMonsterRepository.save = jest.fn(() => {
        return {
          ...monstersStub()[0],
          name: inputMonster.name,
          description: inputMonster.description,
        };
      });

      // Action
      const monster = await service.update(inputMonsterId, inputMonster);

      // Assert
      expect(mockBaseTypeRepository.findOneBy).toBeCalled();
      expect(mockMonsterTypeRepository.find).toBeCalled();
      // expect(mockStatRepository.create).toBeCalled();
      // expect(mockStatRepository.save).toBeCalled();
      expect(mockMonsterRepository.save).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      // expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');

      expect(monster.name).toBe(inputMonster.name);
      expect(monster.description).toBe(inputMonster.description);
    });

    it('should return not found when base type id not found', async () => {
      // Arrange
      mockBaseTypeRepository.findOneBy = jest.fn(() => {
        return null;
      });
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action & Assert
      await expect(
        service.update(inputMonsterId, inputMonster),
      ).rejects.toThrowError('Base type not found!');
    });

    it('should return not found when monster type id not found', async () => {
      // Arrange
      mockMonsterTypeRepository.find = jest.fn(() => {
        return [];
      });
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action & Assert
      await expect(
        service.update(inputMonsterId, inputMonster),
      ).rejects.toThrowError('Monster type not found!');
    });
  });
});
