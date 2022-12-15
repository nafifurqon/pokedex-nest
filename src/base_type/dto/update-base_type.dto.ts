import { PartialType } from '@nestjs/swagger';
import { CreateBaseTypeDto } from './create-base_type.dto';

export class UpdateBaseTypeDto extends PartialType(CreateBaseTypeDto) {}
