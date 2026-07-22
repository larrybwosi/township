import { Module } from '@nestjs/common';
import { TownsService } from './towns.service';
import { TownsController } from './towns.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TownsService, PrismaService],
  controllers: [TownsController],
})
export class TownsModule {}
