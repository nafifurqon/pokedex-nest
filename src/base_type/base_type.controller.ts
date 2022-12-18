import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
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
import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BaseType } from 'src/entities/base_type.entity';
import { BaseTypeService } from './base_type.service';
import { CreateBaseTypeDto } from './dto/create-base_type.dto';
import { UpdateBaseTypeDto } from './dto/update-base_type.dto';

@ApiTags('base-types')
@Controller('base-types')
export class BaseTypeController {
  constructor(private readonly baseTypeService: BaseTypeService) {}

  @ApiCreatedResponse({ type: BaseType })
  @ApiBadRequestResponse()
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBaseTypeDto: CreateBaseTypeDto) {
    return await this.baseTypeService.create(createBaseTypeDto);
  }

  @ApiOkResponse({ type: BaseType, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async findAll(@Query('name') name?: string): Promise<BaseType[]> {
    return this.baseTypeService.findAll(name);
  }

  @ApiOkResponse({ type: BaseType })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const baseType = await this.baseTypeService.findOne(id);

    if (!baseType) {
      throw new NotFoundException();
    }

    return baseType;
  }

  @ApiOkResponse({ type: BaseType })
  @ApiBadRequestResponse()
  @ApiBearerAuth('access_token')
  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBaseTypeDto: UpdateBaseTypeDto,
  ): Promise<BaseType> {
    return await this.baseTypeService.update(id, updateBaseTypeDto);
  }

  @ApiOkResponse({ type: BaseType })
  @ApiBearerAuth('access_token')
  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.baseTypeService.remove(id);
  }
}
