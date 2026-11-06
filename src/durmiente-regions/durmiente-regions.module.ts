import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DurmienteRegion, DurmienteRegionSchema } from '../schema/regions/durmiente-regions.schema';
import { DurmienteRegionsController } from './durmiente-regions.controller';
import { DurmienteRegionsService } from './durmiente-regions.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DurmienteRegion.name, schema: DurmienteRegionSchema }
    ]),
    SharedModule
  ],
  controllers: [DurmienteRegionsController],
  providers: [DurmienteRegionsService],
  exports: [DurmienteRegionsService],
})
export class DurmienteRegionsModule {}
