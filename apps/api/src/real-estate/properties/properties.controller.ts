import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { JwtAuthGuard } from '../../jwt-auth.guard';
import { RolesGuard } from '../../roles.guard';
import { Roles } from '../../roles.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('HOMEOWNER', 'ADMIN')
  @Post()
  createProperty(@Body() data: any, @Request() req: any) {
    return this.propertiesService.create({ ...data, ownerId: req.user.userId });
  }

  @Get()
  getProperties() {
    return this.propertiesService.findAll({});
  }
}
