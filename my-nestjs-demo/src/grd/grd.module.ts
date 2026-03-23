import { Module } from '@nestjs/common';
import { GrdService } from './grd.service';
import { GrdController } from './grd.controller';
import { APP_GUARD } from '@nestjs/core';
import { Global1Guard } from './guards/global1.guard';
import { Global2Guard } from './guards/global2.guard';

@Module({
  providers: [
    GrdService,
    {
      provide: APP_GUARD,
      useClass: Global1Guard,
    },
    {
      provide: APP_GUARD,
      useClass: Global2Guard,
    },
  ],
  controllers: [GrdController],
})
export class GrdModule {}
