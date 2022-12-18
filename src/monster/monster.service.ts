import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from '../entities/monster.entity';
import { BaseType } from 'src/entities/base_type.entity';
import { MonsterType } from 'src/entities/monster_type.entity';
import { Stat } from 'src/entities/stat.entity';
import { CreateStatDto } from 'src/monster/dto/create-stat.dto';
import { MonsterSortOption, OrderOption } from './enums';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { CatchedMonster } from 'src/entities/catched_monster.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MonsterService {
  constructor(
    @InjectRepository(Monster) private monstersRepository: Repository<Monster>,
    @InjectRepository(BaseType)
    private basetypesRepository: Repository<BaseType>,
    @InjectRepository(MonsterType)
    private monsterTypesRepository: Repository<MonsterType>,
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
    @InjectRepository(CatchedMonster)
    private catchedMonsterRepository: Repository<CatchedMonster>,
    private userService: UserService,
  ) {}

  async findAll(
    name?: string,
    types?: string[],
    sort?: MonsterSortOption,
    order?: OrderOption,
    userId?: string,
  ): Promise<Monster[]> {
    let monsters: Monster[] = [];
    if (name || types?.length || sort) {
      const query = this.monstersRepository
        .createQueryBuilder('monster')
        .leftJoinAndSelect('monster.baseType', 'base_type')
        .leftJoinAndSelect('monster.monsterTypes', 'monster_type');

      if (name) {
        query.where('monster.name LIKE :name', { name: `%${name}%` });
      }

      if (types?.length) {
        if (name) {
          query.orWhere('monster_type.id IN (:...types)', {
            types: [...types],
          });
        } else {
          query.where('monster_type.id IN (:...types)', {
            types: [...types],
          });
        }
      }

      if (sort) {
        query.orderBy(
          `monster.${sort.toLowerCase()}`,
          `${order || OrderOption.ASC}`,
        );
      }

      monsters = await query.getMany();
    } else {
      monsters = await this.monstersRepository.find({
        relations: {
          baseType: true,
          monsterTypes: true,
          stat: true,
        },
      });
    }

    const cactchedMonsters: CatchedMonster[] =
      await this.catchedMonsterRepository.find({
        where: {
          userId,
        },
      });

    return monsters.map((monster) => {
      const foundCatchMonster = cactchedMonsters.find(
        (cm) => cm.monsterId === monster.id,
      );

      return {
        ...monster,
        catched: foundCatchMonster ? true : false,
      };
    });
  }

  async findOne(monsterId: string, userId?: string): Promise<Monster> {
    const monster = await this.monstersRepository.findOne({
      where: { id: monsterId },
      relations: {
        baseType: true,
        monsterTypes: true,
      },
    });

    if (userId) {
      const catchedMonster = await this.catchedMonsterRepository.findOneBy({
        monsterId,
        userId,
      });
      monster.catched =
        catchedMonster.monsterId === monsterId &&
        catchedMonster.userId === userId;

      return monster;
    }

    monster.catched = false;

    return monster;
  }

  async create(data: CreateMonsterDto): Promise<Monster> {
    const baseType = await this.basetypesRepository.findOneBy({
      id: data.baseType,
    });

    if (!baseType) {
      throw new NotFoundException('Base type not found!');
    }

    const monsterTypes = await this.monsterTypesRepository.find({
      where: { id: In([...data.monsterTypes]) },
    });

    if (!monsterTypes.length) {
      throw new NotFoundException('Monster type not found!');
    }

    let stat = this.statRepository.create({ ...data.stat });
    stat = await this.statRepository.save(stat);

    const newMonster = this.monstersRepository.create({
      ...data,
      baseType,
      monsterTypes,
      stat,
    });
    return await this.monstersRepository.save(newMonster);
  }

  async update(id: string, data: UpdateMonsterDto): Promise<Monster> {
    const baseType = await this.basetypesRepository.findOneBy({
      id: data.baseType,
    });

    if (!baseType) {
      throw new NotFoundException('Base type not found!');
    }

    const monsterTypes = await this.monsterTypesRepository.find({
      where: { id: In([...data.monsterTypes]) },
    });

    if (!monsterTypes.length) {
      throw new NotFoundException('Monster type not found!');
    }

    const stat = await this.setStat(data.stat);

    const monster = await this.findOne(id);
    return await this.monstersRepository.save({
      ...monster,
      ...data,
      baseType,
      monsterTypes: monsterTypes,
      stat,
    });
  }

  async remove(id: string): Promise<Monster> {
    const monster = await this.findOne(id);
    return await this.monstersRepository.remove(monster);
  }

  async setStat(data: CreateStatDto): Promise<Stat> {
    let stat = await this.statRepository.findOneBy({ ...data });
    if (!stat) {
      stat = this.statRepository.create({ ...data });
    }
    stat = await this.statRepository.save({ ...stat, ...data });
    return stat;
  }

  async catchMonster(
    monsterId: string,
    jwtUser: JwtPayloadDto,
  ): Promise<Monster> {
    const { userId } = jwtUser;

    const monster = await this.findOne(monsterId);

    if (!monster) {
      throw new NotFoundException('Monster not found!');
    }

    const user = await this.userService.findById(userId);

    const catchedMonster = this.catchedMonsterRepository.create({
      monster,
      user,
    });
    await this.catchedMonsterRepository.save(catchedMonster);

    return await this.findOne(monsterId, userId);
  }
}
