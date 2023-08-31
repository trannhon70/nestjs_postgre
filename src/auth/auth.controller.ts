import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: any): Promise<any> {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@Body() body: any): Promise<any> {
    return this.authService.logOut(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-all-token')
  getAllToken(): Promise<any> {
    return this.authService.getAllToken();
  }
}
