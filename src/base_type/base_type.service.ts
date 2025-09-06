import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseType } from 'src/entities/base_type.entity';
import { CreateBaseTypeDto } from './dto/create-base_type.dto';
import { UpdateBaseTypeDto } from './dto/update-base_type.dto';
import {
  FindAllBaseTypeQueryDto,
  FindAllBaseTypeResponseDto,
} from './dto/find-base-type.dto';
import { Monster } from '../entities/monster.entity';

@Injectable()
export class BaseTypeService {
  constructor(
    @InjectRepository(BaseType)
    private basetypesRepository: Repository<BaseType>,
    @InjectRepository(Monster)
    private monstersRepository: Repository<Monster>,
  ) {}

  async create(createBaseTypeDto: CreateBaseTypeDto): Promise<BaseType> {
    const newBaseType = this.basetypesRepository.create({
      ...createBaseTypeDto,
    });
    return await this.basetypesRepository.save(newBaseType);
  }

  async findAll(
    query: FindAllBaseTypeQueryDto,
  ): Promise<FindAllBaseTypeResponseDto> {
    const { search, page, limit } = query;

    const qb = this.basetypesRepository.createQueryBuilder('base_type');

    if (search) {
      qb.andWhere('base_type.name ILIKE :search', { search: `%${search}%` });
    }

    const offset = (page - 1) * limit;
    qb.offset(offset).limit(limit);

    let data: BaseType[] = [];
    let totalData = 0;
    [data, totalData] = await qb.getManyAndCount();

    const baseTypeIds = data.map((bt) => bt.id);
    let monsters = [];
    if (baseTypeIds.length) {
      monsters = await this.monstersRepository
        .createQueryBuilder('monster')
        .leftJoinAndSelect('monster.baseType', 'base_type')
        .where('monster."baseTypeId" IN (:...baseTypeIds)', { baseTypeIds })
        .getMany();
    }

    // create a map of monsters by base type id
    data = data.map((bt) => {
      const foundMonsters = monsters.filter((m) => m.baseType.id === bt.id);
      return { ...bt, monsters: foundMonsters };
    });

    return { data, total_data: totalData };
  }

  async findOne(id: string): Promise<BaseType> {
    return await this.basetypesRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateBaseTypeDto: UpdateBaseTypeDto,
  ): Promise<BaseType> {
    const baseType = await this.findOne(id);
    return await this.basetypesRepository.save({
      ...baseType,
      ...updateBaseTypeDto,
    });
  }

  async remove(id: string): Promise<BaseType> {
    const baseType = await this.findOne(id);
    return await this.basetypesRepository.remove(baseType);
  }
}
