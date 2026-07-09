import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() data: any) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @MessagePattern('validate_token')
  async validateToken(@Payload() token: string) {
    // This could be more complex if needed, for now the Gateway can also do it
    return true;
  }
}
