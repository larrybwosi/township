import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async findAll(query: any) {
    return this.prisma.product.findMany({
      where: query,
      include: { town: true, producer: true, category: true },
    });
  }
}
