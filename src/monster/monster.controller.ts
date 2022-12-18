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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { MonsterSortOption, OrderOption } from './enums';
import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('monsters')
@Controller('monsters')
export class MonsterController {
  constructor(private monstersService: MonsterService) {}

  @ApiOkResponse({ type: Monster, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'types', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: MonsterSortOption })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: OrderOption,
    example: OrderOption.ASC,
  })
  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('types') types?: string[],
    @Query('sort') sort?: MonsterSortOption,
    @Query('order') order?: OrderOption,
  ): Promise<Monster[]> {
    return await this.monstersService.findAll(name, types, sort, order);
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
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateMonsterDto): Promise<Monster> {
    return await this.monstersService.create(body);
  }

  @ApiOkResponse({ type: Monster })
  @ApiBadRequestResponse()
  @ApiBearerAuth('access_token')
  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateMonsterDto) {
    return this.monstersService.update(id, updateTodoDto);
  }

  @ApiOkResponse({ type: Monster })
  @ApiBearerAuth('access_token')
  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }
}
