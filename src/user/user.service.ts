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
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.role = UserRole.USER;

    return await this.usersRepository.save(user);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }
}
