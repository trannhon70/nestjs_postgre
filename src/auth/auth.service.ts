/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';

const expiresInInSeconds = 60 * 60 * 24 * 3; // 3 days in seconds
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
    };

    const createAccessToken = await this.jwtService.signAsync(payload);

    const createRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: expiresInInSeconds,
      secret: process.env.SECRECT_JWT_REFRESH_TOKEN,
    });

    const newUser = {
      accessToken: createAccessToken,
      refreshToken: createRefreshToken,
    };

    await this.usersService.createTokenUser(newUser);

    const data = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      created_at: user.created_at,
    };
    return {
      access_token: createAccessToken,
      refresh_token: createRefreshToken,
      uniqueCode: 1,
      status: HttpStatus.ACCEPTED,
      message: 'success login',
      data: data,
    };
  }

  async logOut(body: any): Promise<any> {
    try {
      const user: any = await this.usersService.findAndDeleteToken(
        body.refreshToken,
      );
      // if (user.status === 200) {
      //   return {
      //     status: HttpStatus.OK,
      //     uniqueCode: 1,
      //   };
      // }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllToken(): Promise<any> {
    try {
      const token = await this.usersService.getAllToken();
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}
