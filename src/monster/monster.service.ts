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
  ) {}

  async findAll(
    name?: string,
    types?: string[],
    sort?: MonsterSortOption,
    order?: OrderOption,
  ): Promise<Monster[]> {
    console.log('sort', sort);
    console.log('order', order);

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
        console.log('order', `${order || OrderOption.ASC}`);
        console.log('sort', `monster.${sort.toLowerCase()}`);
        query.orderBy(
          `monster.${sort.toLowerCase()}`,
          `${order || OrderOption.ASC}`,
        );
      }

      return await query.getMany();
    }

    return await this.monstersRepository.find({
      relations: {
        baseType: true,
        monsterTypes: true,
        stat: true,
      },
    });
  }

  async findOne(id: string): Promise<Monster> {
    return this.monstersRepository.findOne({
      where: { id },
      relations: {
        baseType: true,
        monsterTypes: true,
      },
    });
  }

  async create(data: CreateMonsterDto): Promise<Monster> {
    console.log('data', data);
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

    const newMonster = this.monstersRepository.create({
      ...data,
      baseType,
      monsterTypes,
      stat,
    });
    return await this.monstersRepository.save(newMonster);
  }

  async update(id: string, data: UpdateMonsterDto): Promise<Monster> {
    console.log('data', data);
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
}
