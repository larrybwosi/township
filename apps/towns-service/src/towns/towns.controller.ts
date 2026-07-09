import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TownsService } from './towns.service';

@Controller()
export class TownsController {
  constructor(private readonly townsService: TownsService) {}

  @MessagePattern('create_town')
  create(@Payload() data: any) {
    return this.townsService.create(data);
  }

  @MessagePattern('get_towns')
  findAll() {
    return this.townsService.findAll();
  }
}
