import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MonsterTypeService } from './monster_type.service';
import { CreateMonsterTypeDto } from './dto/create-monster_type.dto';
import { UpdateMonsterTypeDto } from './dto/update-monster_type.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MonsterType } from 'src/entities/monster_type.entity';
import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('monster-types')
@Controller('monster-types')
export class MonsterTypeController {
  constructor(private readonly monsterTypeService: MonsterTypeService) {}

  @ApiCreatedResponse({ type: MonsterType })
  @ApiBadRequestResponse()
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth('access_token')
  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMonsterTypeDto: UpdateMonsterTypeDto,
  ): Promise<MonsterType> {
    return await this.monsterTypeService.update(id, updateMonsterTypeDto);
  }

  @ApiOkResponse({ type: MonsterType })
  @ApiBearerAuth('access_token')
  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<MonsterType> {
    return await this.monsterTypeService.remove(id);
  }
}
