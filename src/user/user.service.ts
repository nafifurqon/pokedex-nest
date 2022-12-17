import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/app.utils';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserRequestDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(data: RegisterUserRequestDto): Promise<User> {
    console.log('data', data);
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.role = UserRole.USER;

    const test = await this.usersRepository.save(user);

    return test;
  }
}
