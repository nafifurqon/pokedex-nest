import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MonsterTypeService } from './monster_type.service';
import { CreateMonsterTypeDto } from './dto/create-monster_type.dto';
import { UpdateMonsterTypeDto } from './dto/update-monster_type.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MonsterType } from 'src/entities/monster_type.entity';

@ApiTags('monster-types')
@Controller('monster-types')
export class MonsterTypeController {
  constructor(private readonly monsterTypeService: MonsterTypeService) {}

  @ApiCreatedResponse({ type: MonsterType })
  @ApiBadRequestResponse()
  @Post()
  async create(
    @Body() createMonsterTypeDto: CreateMonsterTypeDto,
  ): Promise<MonsterType> {
    return await this.monsterTypeService.create(createMonsterTypeDto);
  }

  @ApiOkResponse({ type: MonsterType, isArray: true })
  // @ApiQuery({ name: 'name', required: false })
  @Get()
  async findAll(): Promise<MonsterType[]> {
    return await this.monsterTypeService.findAll();
  }

  @ApiOkResponse({ type: MonsterType })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MonsterType> {
    const monsterType = await this.monsterTypeService.findOne(id);

    if (!monsterType) {
      throw new NotFoundException();
    }

    return monsterType;
  }

  @ApiOkResponse({ type: MonsterType })
  @ApiBadRequestResponse()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMonsterTypeDto: UpdateMonsterTypeDto,
  ): Promise<MonsterType> {
    return await this.monsterTypeService.update(id, updateMonsterTypeDto);
  }

  @ApiOkResponse({ type: MonsterType })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MonsterType> {
    return await this.monsterTypeService.remove(id);
  }
}
