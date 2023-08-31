import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { TokenUser } from './entity/token.entity';
import { TokenUserDto } from './entity/token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
    @InjectRepository(TokenUser)
    private readonly TokenUserRepository: Repository<TokenUser>,
  ) {}

  findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.UsersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.UsersRepository.delete(id);
  }

  async createTokenUser(user: any): Promise<any> {
    try {
      await this.TokenUserRepository.save(user);
      return {
        uniqueCode: 1,
        status: HttpStatus.OK,
        message: 'user is updated',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOneSignIn(username: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const checkUsername = await this.UsersRepository.findOneBy({
        username: username,
      });
      if (checkUsername) {
        return checkUsername;
      }
      return checkUsername;
    } catch (error) {
      console.log(error);
    }
  }

  async Register(body: UserDto): Promise<UserDto> {
    try {
      body.password = bcrypt.hashSync(body.password, 10);

      const result = await this.UsersRepository.save(body);
      return plainToInstance(UserDto, result, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string): Promise<{ result: any }> {
    try {
      const result = await this.UsersRepository.delete(id);
      return {
        result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllUser(): Promise<{ data: any; status: number }> {
    try {
      const result = await this.UsersRepository.find();
      return {
        data: result,
        status: 1,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAndDeleteToken(refreshToken: string): Promise<TokenUserDto> {
    try {
      const token = await this.TokenUserRepository.findOneBy({
        refreshToken: refreshToken,
      });
      // ádas
      // console.log(token);
      // return;

      if (token) {
        const result = await this.TokenUserRepository.delete(token);
        return plainToInstance(TokenUserDto, result, {
          excludeExtraneousValues: true,
        });
      } else {
        // return {
        //   // uniqueCode: 1,
        //   // status: HttpStatus.BAD_REQUEST,
        //   // message: 'Token not found',
        // };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllToken() {
    try {
      const result = await this.TokenUserRepository.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
