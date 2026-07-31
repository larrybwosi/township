import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../jwt-auth.guard';
import { RolesGuard } from '../../roles.guard';
import { Roles } from '../../roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODUCER', 'ADMIN')
  @Post()
  createProduct(@Body() data: any, @Request() req: any) {
    return this.productsService.create({ ...data, producerId: req.user.userId });
  }

  @Get()
  getProducts() {
    return this.productsService.findAll({});
  }
}
