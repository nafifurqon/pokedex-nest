import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterType } from 'src/entities/monster_type.entity';
import { CreateMonsterTypeDto } from './dto/create-monster_type.dto';
import { UpdateMonsterTypeDto } from './dto/update-monster_type.dto';
import {
  FindAllMonsterTypeQueryDto,
  FindAllMonsterTypeResponseDto,
} from './dto/find-monster-type.dto';

@Injectable()
export class MonsterTypeService {
  constructor(
    @InjectRepository(MonsterType)
    private monsterTypesRepository: Repository<MonsterType>,
  ) {}

  async create(
    createMonsterTypeDto: CreateMonsterTypeDto,
  ): Promise<MonsterType> {
    const newMonsterType = this.monsterTypesRepository.create({
      ...createMonsterTypeDto,
    });
    return await this.monsterTypesRepository.save(newMonsterType);
  }

  async findAll(
    query: FindAllMonsterTypeQueryDto,
  ): Promise<FindAllMonsterTypeResponseDto> {
    const { search, page, limit } = query;

    const qb = this.monsterTypesRepository.createQueryBuilder('monsterType');

    if (search) {
      qb.andWhere('monsterType.name ILIKE :search', { search: `%${search}%` });
    }

    const offset = (page - 1) * limit;
    qb.offset(offset).limit(limit);

    const [data, total_data] = await qb.getManyAndCount();

    return { data, total_data };
  }

  async findOne(id: string): Promise<MonsterType> {
    return await this.monsterTypesRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateMonsterTypeDto: UpdateMonsterTypeDto,
  ): Promise<MonsterType> {
    const monsterType = await this.findOne(id);
    return await this.monsterTypesRepository.save({
      ...monsterType,
      ...updateMonsterTypeDto,
    });
  }

  async remove(id: string): Promise<MonsterType> {
    const monsterType = await this.findOne(id);
    return await this.monsterTypesRepository.remove(monsterType);
  }
}
