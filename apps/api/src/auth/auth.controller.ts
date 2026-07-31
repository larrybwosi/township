import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  register(@Body() data: any) {
    return this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
