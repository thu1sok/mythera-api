import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DurmientePlace, DurmientePlaceSchema } from '../schema/places/durmiente-places.schema';
import { DurmienteRegion, DurmienteRegionSchema } from '../schema/regions/durmiente-regions.schema';
import { DurmientePlacesController } from './durmiente-places.controller';
import { DurmientePlacesService } from './durmiente-places.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DurmientePlace.name, schema: DurmientePlaceSchema },
      { name: DurmienteRegion.name, schema: DurmienteRegionSchema }
    ]),
    SharedModule
  ],
  controllers: [DurmientePlacesController],
  providers: [DurmientePlacesService],
  exports: [DurmientePlacesService],
})
export class DurmientePlacesModule {}
