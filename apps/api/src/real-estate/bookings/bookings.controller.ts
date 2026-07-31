import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../../jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createBooking(@Body() data: any, @Request() req: any) {
    return this.bookingsService.create({ ...data, userId: req.user.userId });
  }
}
