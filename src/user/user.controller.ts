import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('register')
  Register(@Body() body: UserDto): Promise<UserDto> {
    return this.UsersService.Register(body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.UsersService.deleteUser(id);
  }

  @Get('get-all-user')
  GetAllUser(): Promise<{ data: any; status: number }> {
    // return;
    return this.UsersService.GetAllUser();
  }
}
