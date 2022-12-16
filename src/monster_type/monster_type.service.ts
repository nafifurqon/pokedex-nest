import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterType } from 'src/entities/monster_type.entity';
import { CreateMonsterTypeDto } from './dto/create-monster_type.dto';
import { UpdateMonsterTypeDto } from './dto/update-monster_type.dto';

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

  async findAll(): Promise<MonsterType[]> {
    return await this.monsterTypesRepository.find({
      relations: {
        monsters: true,
      },
    });
  }

  async findOne(id: string): Promise<MonsterType> {
    return await this.monsterTypesRepository.findOne({
      where: { id },
      relations: { monsters: true },
    });
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
