import { UserRole } from 'src/app.utils';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

export const jwtUserStub = (): JwtPayloadDto => ({
  userId: '2ab9706c-5499-4d8c-88c2-ecef6e815181',
  email: 'user1@gmail.com',
  role: UserRole.USER,
});
