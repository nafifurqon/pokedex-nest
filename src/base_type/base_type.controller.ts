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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BaseType } from 'src/entities/base-type.entity';
import { BaseTypeService } from './base_type.service';
import { CreateBaseTypeDto } from './dto/create-base_type.dto';
import { UpdateBaseTypeDto } from './dto/update-base_type.dto';

@ApiTags('base-types')
@Controller('base-types')
export class BaseTypeController {
  constructor(private readonly baseTypeService: BaseTypeService) {}

  @ApiCreatedResponse({ type: BaseType })
  @ApiBadRequestResponse()
  @Post()
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
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBaseTypeDto: UpdateBaseTypeDto,
  ): Promise<BaseType> {
    return await this.baseTypeService.update(id, updateBaseTypeDto);
  }

  @ApiOkResponse({ type: BaseType })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseTypeService.remove(id);
  }
}
