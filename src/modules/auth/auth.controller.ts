import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { loginDTO, registerDTO } from './dto/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: loginDTO, @Res() res: Response) {
    console.log(loginData);
    return this.authService.login(loginData, res);
  }

  @Post()
  async register(@Body() registerData: registerDTO) {
    console.log(registerData);
    return this.authService.register(registerData);
  }
}
