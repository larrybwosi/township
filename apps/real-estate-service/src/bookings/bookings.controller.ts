import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingsService } from './bookings.service';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @MessagePattern('create_booking')
  create(@Payload() data: any) {
    return this.bookingsService.create(data);
  }

  @MessagePattern('get_user_bookings')
  findByUser(@Payload() userId: string) {
    return this.bookingsService.findByUser(userId);
  }
}
