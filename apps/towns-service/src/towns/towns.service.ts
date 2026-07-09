import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TownsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.town.create({ data });
  }

  async findAll() {
    return this.prisma.town.findMany();
  }
}
