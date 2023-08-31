import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { TokenUser } from './entity/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TokenUser])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
