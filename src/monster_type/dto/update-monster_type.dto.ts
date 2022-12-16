import { PartialType } from '@nestjs/swagger';
import { CreateMonsterTypeDto } from './create-monster_type.dto';

export class UpdateMonsterTypeDto extends PartialType(CreateMonsterTypeDto) {}
