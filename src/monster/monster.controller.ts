import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from '../entities/monster.entity';
import { MonsterService } from './monster.service';

@ApiTags('monsters')
@Controller('monsters')
export class MonsterController {
  constructor(private monstersService: MonsterService) {}

  @ApiOkResponse({ type: Monster, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async findAll(@Query('name') name?: string): Promise<Monster[]> {
    return await this.monstersService.findAll(name);
  }

  @ApiOkResponse({ type: Monster })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Monster> {
    const monster = this.monstersService.findOne(id);

    if (!monster) {
      throw new NotFoundException();
    }

    return monster;
  }

  @ApiCreatedResponse({ type: Monster })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() body: CreateMonsterDto): Promise<Monster> {
    return await this.monstersService.create(body);
  }

  @ApiOkResponse({ type: Monster })
  @ApiBadRequestResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateMonsterDto) {
    return this.monstersService.update(id, updateTodoDto);
  }

  @ApiOkResponse({ type: Monster })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }
}
