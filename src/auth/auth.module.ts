import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/user/users.service';
import { TokenUser } from 'src/user/entity/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TokenUser]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
