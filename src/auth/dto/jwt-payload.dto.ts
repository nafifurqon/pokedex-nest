import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { UserRole } from 'src/app.utils';

export class JwtPayloadDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
