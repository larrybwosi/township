import { Module } from '@nestjs/common';
import { TownsService } from './towns.service';

@Module({
  providers: [TownsService],
  exports: [TownsService],
})
export class TownsModule {}
