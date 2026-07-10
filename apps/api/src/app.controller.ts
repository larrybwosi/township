import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TownsService } from './towns/towns.service';
import { PropertiesService } from './real-estate/properties/properties.service';
import { BookingsService } from './real-estate/bookings/bookings.service';
import { ProductsService } from './marketplace/products/products.service';
import { OrdersService } from './marketplace/orders/orders.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly townsService: TownsService,
    private readonly propertiesService: PropertiesService,
    private readonly bookingsService: BookingsService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('auth/register')
  register(@Body() data: any) {
    return this.usersService.create(data);
  }

  @Post('auth/login')
  async login(@Body() data: any) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('towns')
  createTown(@Body() data: any) {
    return this.townsService.create(data);
  }

  @Get('towns')
  getTowns() {
    return this.townsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('HOMEOWNER', 'ADMIN')
  @Post('properties')
  createProperty(@Body() data: any, @Request() req: any) {
    return this.propertiesService.create({ ...data, ownerId: req.user.userId });
  }

  @Get('properties')
  getProperties() {
    return this.propertiesService.findAll({});
  }

  @UseGuards(JwtAuthGuard)
  @Post('bookings')
  createBooking(@Body() data: any, @Request() req: any) {
    return this.bookingsService.create({ ...data, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODUCER', 'ADMIN')
  @Post('products')
  createProduct(@Body() data: any, @Request() req: any) {
    return this.productsService.create({ ...data, producerId: req.user.userId });
  }

  @Get('products')
  getProducts() {
    return this.productsService.findAll({});
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  createOrder(@Body() data: any, @Request() req: any) {
    return this.ordersService.create({ ...data, userId: req.user.userId });
  }
}
