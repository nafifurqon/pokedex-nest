import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post('/register')
  async register(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: RegisterUserRequestDto,
  ): Promise<User> {
    return await this.usersService.register(body);
  }
}
