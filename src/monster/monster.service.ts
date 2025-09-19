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
import { OrderOption } from './enums';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { CatchedMonster } from 'src/entities/catched_monster.entity';
import { UserService } from 'src/user/user.service';
import {
  FindAllMonsterQueryDto,
  FindAllMonsterResponseDto,
} from './dto/find-monster.dto';

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
    payload: FindAllMonsterQueryDto,
    userId?: string,
  ): Promise<FindAllMonsterResponseDto> {
    const { search, sort, order, page, limit } = payload;
    const types = payload.types ? payload.types.split(',') : [];

    let data: Monster[] = [];
    let totalData = 0;

    const query = this.monstersRepository
      .createQueryBuilder('monster')
      .leftJoinAndSelect('monster.baseType', 'base_type')
      .leftJoinAndSelect('monster.monsterTypes', 'monster_type');

    if (search) {
      query.where('monster.name ILIKE :search', { search: `%${search}%` });
    }

    if (types?.length) {
      query.andWhere('monster_type.id IN (:...types)', { types: [...types] });
    }

    if (sort) {
      query.orderBy(
        `monster.${sort.toLowerCase()}`,
        `${order || OrderOption.ASC}`,
      );
    }

    const offset = (page - 1) * limit;
    query.offset(offset).limit(limit);

    [data, totalData] = await query.getManyAndCount();

    const cactchedMonsters: CatchedMonster[] =
      await this.catchedMonsterRepository.find({
        where: {
          userId,
        },
      });

    data = data.map((monster) => {
      const foundCatchMonster = cactchedMonsters.find(
        (cm) => cm.monsterId === monster.id,
      );

      return {
        ...monster,
        catched: foundCatchMonster ? true : false,
      };
    });

    return { data, total_data: totalData || data.length };
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
        catchedMonster &&
        catchedMonster.monsterId === monsterId &&
        catchedMonster.userId === userId
          ? true
          : false;

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

    const newMonster = this.monstersRepository.create({
      ...data,
      baseType,
      monsterTypes,
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

    const monster = await this.findOne(id);
    return await this.monstersRepository.save({
      ...monster,
      ...data,
      baseType,
      monsterTypes: monsterTypes,
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
