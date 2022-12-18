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
  Request,
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
import { CatchMonsterDto } from './dto/catch-monster.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/app.utils';

@ApiTags('monsters')
@Controller('monsters')
export class MonsterController {
  constructor(private monstersService: MonsterService) {}

  @ApiOkResponse({ type: Monster, isArray: true })
  @ApiBearerAuth('access_token')
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
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth('access_token')
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Monster> {
    const monster = this.monstersService.findOne(id, req.user.userId);

    if (!monster) {
      throw new NotFoundException();
    }

    return monster;
  }

  @ApiCreatedResponse({ type: Monster })
  @ApiBadRequestResponse()
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }

  @ApiOkResponse({ type: Monster })
  @ApiNotFoundResponse()
  @ApiBearerAuth('access_token')
  @Post('/catch')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard)
  async catch(
    @Request() req: any,
    @Body() body: CatchMonsterDto,
  ): Promise<Monster> {
    return await this.monstersService.catchMonster(body.monster, req.user);
  }
}
