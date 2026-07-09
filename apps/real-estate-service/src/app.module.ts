import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [PropertiesModule, BookingsModule],
})
export class AppModule {}
