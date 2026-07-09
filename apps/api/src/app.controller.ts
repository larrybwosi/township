import { Controller, Get, Post, Body, Inject, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('TOWNS_SERVICE') private townsClient: ClientProxy,
    @Inject('REAL_ESTATE_SERVICE') private realEstateClient: ClientProxy,
    @Inject('MARKETPLACE_SERVICE') private marketplaceClient: ClientProxy,
  ) {}

  @Post('auth/register')
  register(@Body() data: any) {
    return this.authClient.send('create_user', data);
  }

  @Post('auth/login')
  login(@Body() data: any) {
    return this.authClient.send('login', data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('towns')
  createTown(@Body() data: any) {
    return this.townsClient.send('create_town', data);
  }

  @Get('towns')
  getTowns() {
    return this.townsClient.send('get_towns', {});
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('HOMEOWNER', 'ADMIN')
  @Post('properties')
  createProperty(@Body() data: any, @Request() req: any) {
    return this.realEstateClient.send('create_property', { ...data, ownerId: req.user.userId });
  }

  @Get('properties')
  getProperties() {
    return this.realEstateClient.send('get_properties', {});
  }

  @UseGuards(JwtAuthGuard)
  @Post('bookings')
  createBooking(@Body() data: any, @Request() req: any) {
    return this.realEstateClient.send('create_booking', { ...data, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODUCER', 'ADMIN')
  @Post('products')
  createProduct(@Body() data: any, @Request() req: any) {
    return this.marketplaceClient.send('create_product', { ...data, producerId: req.user.userId });
  }

  @Get('products')
  getProducts() {
    return this.marketplaceClient.send('get_products', {});
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  createOrder(@Body() data: any, @Request() req: any) {
    return this.marketplaceClient.send('create_order', { ...data, userId: req.user.userId });
  }
}
