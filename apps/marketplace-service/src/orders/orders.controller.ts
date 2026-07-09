import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create_order')
  create(@Payload() data: any) {
    return this.ordersService.create(data);
  }

  @MessagePattern('get_user_orders')
  findByUser(@Payload() userId: string) {
    return this.ordersService.findByUser(userId);
  }
}
