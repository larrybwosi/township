import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.property.create({ data });
  }

  async findAll(query: any) {
    return this.prisma.property.findMany({
      where: query,
      include: { town: true, owner: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
      include: { town: true, owner: true, bookings: true, reviews: true },
    });
  }
}
