import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
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
}
