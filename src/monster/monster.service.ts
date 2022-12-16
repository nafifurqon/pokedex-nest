import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from '../entities/monster.entity';
import { BaseType } from 'src/entities/base_type.entity';
import { MonsterType } from 'src/entities/monster_type.entity';

@Injectable()
export class MonsterService {
  constructor(
    @InjectRepository(Monster) private monstersRepository: Repository<Monster>,
    @InjectRepository(BaseType)
    private basetypesRepository: Repository<BaseType>,
    @InjectRepository(MonsterType)
    private monsterTypesRepository: Repository<MonsterType>,
  ) {}

  async findAll(name?: string): Promise<Monster[]> {
    if (name)
      return await this.monstersRepository
        .createQueryBuilder('monster')
        .leftJoinAndSelect('monster.baseType', 'base_type')
        .where('monster.name like :name', { name: `%${name}%` })
        .getMany();
    return await this.monstersRepository.find({
      relations: {
        baseType: true,
        monsterTypes: true,
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

    const newMonster = await this.monstersRepository.create({
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
}
