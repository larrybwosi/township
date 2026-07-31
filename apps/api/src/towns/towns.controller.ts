import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { TownsService } from './towns.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';

@Controller('towns')
export class TownsController {
  constructor(private readonly townsService: TownsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  createTown(@Body() data: any) {
    return this.townsService.create(data);
  }

  @Get()
  getTowns() {
    return this.townsService.findAll();
  }
}
