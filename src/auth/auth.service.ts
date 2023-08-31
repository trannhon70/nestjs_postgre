import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: any): Promise<any> {
    const user = await this.usersService.findOneSignIn(body.username);
    const isMatch = await bcrypt.compare(body.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user?.id,
      username: user?.username,
      //   role: user?.role,
      //   avatar: user?.avatar,
      //   firstName: user?.firstName,
      //   lastName: user?.lastName,
      //   fullName: user?.fullName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      payload,
    };
  }
}
