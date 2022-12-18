import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { inputMonsterStub, monstersStub } from './stubs/monsters.stub';
import { jwtUserStub } from './stubs/users.stub';

describe('MonsterController', () => {
  let controller: MonsterController;

  const mockMonsterService = {
    findAll: jest.fn(() => {
      return monstersStub();
    }),
    findOne: jest.fn(() => {
      return monstersStub()[0];
    }),
    create: jest.fn(() => {
      return {
        ...monstersStub()[0],
        id: 'new_monster_id_1',
      };
    }),
    update: jest.fn((id, body) => {
      return {
        ...monstersStub()[0],
        name: body.name,
        description: body.description,
      };
    }),
    remove: jest.fn(() => {
      return monstersStub()[0];
    }),
    catchMonster: jest.fn(() => {
      return {
        ...monstersStub()[0],
        catched: true,
      };
    }),
  };

  const mockUserService = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonsterController],
      providers: [
        {
          provide: MonsterService,
          useValue: mockMonsterService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<MonsterController>(MonsterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should be get all monsters', async () => {
      // Action
      const monsters = await controller.findAll();

      // Assert
      expect(mockMonsterService.findAll).toBeCalled();

      expect(monsters[0]).toHaveProperty('id');
      expect(monsters[0]).toHaveProperty('name');
      expect(monsters[0]).toHaveProperty('description');
      expect(monsters[0]).toHaveProperty('baseType');
      expect(monsters[0]).toHaveProperty('monsterTypes');
      expect(monsters[0]).toHaveProperty('stat');
      expect(monsters[0]).toHaveProperty('catched');
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should be get one monster by id', async () => {
      // Arrange
      const inputId = monstersStub()[0].id;
      const jwtUser = jwtUserStub();

      // Action
      const monster = await controller.findOne(inputId, { user: jwtUser });

      // Assert
      expect(mockMonsterService.findOne).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create and return created monster', async () => {
      // Arrange
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action
      const monster = await controller.create(inputMonster);

      // Assert
      expect(mockMonsterService.create).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update monster by id and return updated monster', async () => {
      // Arrange
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';
      const inputMonster: CreateMonsterDto = inputMonsterStub();

      // Action
      const monster = await controller.update(inputMonsterId, inputMonster);

      // Assert
      expect(mockMonsterService.update).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');

      expect(monster.name).toBe(inputMonster.name);
      expect(monster.description).toBe(inputMonster.description);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should remove monster by id and return removed monster', async () => {
      // Arrange
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';

      // Action
      const monster = await controller.remove(inputMonsterId);

      // Assert
      expect(mockMonsterService.remove).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');
    });
  });

  describe('catch', () => {
    it('should be defined', () => {
      expect(controller.catch).toBeDefined();
    });

    it('should catched monster', async () => {
      // Arrange
      const inputMonsterId = '81fa9ca6-4dab-4f4a-9691-acb622fd358c';
      const jwtUser = jwtUserStub();

      // Action
      const monster = await controller.catch(
        { user: jwtUser },
        { monster: inputMonsterId },
      );

      // Assert
      expect(mockMonsterService.catchMonster).toBeCalled();

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('baseType');
      expect(monster).toHaveProperty('monsterTypes');
      expect(monster).toHaveProperty('stat');
      expect(monster).toHaveProperty('catched');

      expect(monster.catched).toBe(true);
    });
  });
});
