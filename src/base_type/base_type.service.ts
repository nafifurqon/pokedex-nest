import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseType } from 'src/entities/base-type.entity';
import { CreateBaseTypeDto } from './dto/create-base_type.dto';
import { UpdateBaseTypeDto } from './dto/update-base_type.dto';

@Injectable()
export class BaseTypeService {
  constructor(
    @InjectRepository(BaseType)
    private basetypesRepository: Repository<BaseType>,
  ) {}

  async create(createBaseTypeDto: CreateBaseTypeDto): Promise<BaseType> {
    const newBaseType = await this.basetypesRepository.create({
      ...createBaseTypeDto,
    });
    return await this.basetypesRepository.save(newBaseType);
  }

  async findAll(name?: string): Promise<BaseType[]> {
    if (name) {
      return await this.basetypesRepository
        .createQueryBuilder('base_type')
        .leftJoinAndSelect('base_type.monsterId', 'monster')
        .where('base_type.name like :name', { name: `%${name}%` })
        .getMany();
    }
    return await this.basetypesRepository.find({
      relations: {
        monsterId: true,
      },
    });
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
