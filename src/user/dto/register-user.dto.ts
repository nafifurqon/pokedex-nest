import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class RegisterUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirm_password: string;
}
