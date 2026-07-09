import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('create_product')
  create(@Payload() data: any) {
    return this.productsService.create(data);
  }

  @MessagePattern('get_products')
  findAll(@Payload() query: any) {
    return this.productsService.findAll(query);
  }
}
