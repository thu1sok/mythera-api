import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaceDetailsSchema, PlaceDetails } from '../places/places.schema';
import { RegionPointSchema, RegionPoint } from './regions.schema';

export type DurmienteRegionDocument = DurmienteRegion & Document;

@Schema({ collection: 'durmiente_regions', timestamps: true })
export class DurmienteRegion {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description?: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true, default: '#7c3aed' })
  color: string;

  @Prop({ required: false, default: 0.35 })
  fillOpacity?: number;

  @Prop({ type: [RegionPointSchema], required: true, default: [] })
  points: RegionPoint[];

  @Prop({ type: PlaceDetailsSchema, required: false, default: () => ({}) })
  details?: PlaceDetails;
}

export const DurmienteRegionSchema = SchemaFactory.createForClass(DurmienteRegion);
