import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any, @Body() body: LoginDto): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async user(@Request() req: any): Promise<any> {
    return req.user;
  }
}
