import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../dto';
import { Request } from 'express';
import { Auth } from '../decorators/auth.decorator';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { ValidRoles } from '../models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(ValidRoles.user)
  getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user);
  }
}
