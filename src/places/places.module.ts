import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Place, PlaceSchema } from '../schema/places/places.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
    SharedModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
