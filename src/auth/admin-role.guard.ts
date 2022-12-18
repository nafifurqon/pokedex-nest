import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from 'src/app.utils';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { userId } = request.user;
      const user = await this.userService.findById(userId);
      return user.role === UserRole.ADMIN;
    }

    return false;
  }
}
