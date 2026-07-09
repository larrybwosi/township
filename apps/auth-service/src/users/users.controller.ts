import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  async create(@Payload() data: any) {
    return this.usersService.create(data);
  }

  @MessagePattern('find_user')
  async findOne(@Payload() email: string) {
    return this.usersService.findOne(email);
  }
}
