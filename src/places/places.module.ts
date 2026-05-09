import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from '../schema/places/places.schema';
import { Npc, NpcSchema } from '../schema/wiki/npc.schema';
import { Region, RegionSchema } from '../schema/regions/regions.schema';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: Npc.name, schema: NpcSchema },
      { name: Region.name, schema: RegionSchema }
    ]),
    SharedModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
