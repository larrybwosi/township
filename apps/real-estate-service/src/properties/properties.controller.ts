import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PropertiesService } from './properties.service';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern('create_property')
  create(@Payload() data: any) {
    return this.propertiesService.create(data);
  }

  @MessagePattern('get_properties')
  findAll(@Payload() query: any) {
    return this.propertiesService.findAll(query);
  }

  @MessagePattern('get_property')
  findOne(@Payload() id: string) {
    return this.propertiesService.findOne(id);
  }
}
