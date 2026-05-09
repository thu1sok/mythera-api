import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaceDetailsSchema, PlaceDetails } from '../places/places.schema';

export type RegionDocument = Region & Document;

@Schema()
export class RegionPoint {
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}
export const RegionPointSchema = SchemaFactory.createForClass(RegionPoint);

@Schema({ timestamps: true })
export class Region {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description?: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true, default: '#3388ff' })
  color: string;

  @Prop({ required: false, default: 0.35 })
  fillOpacity?: number;

  @Prop({ type: [RegionPointSchema], required: true, default: [] })
  points: RegionPoint[];

  @Prop({ type: PlaceDetailsSchema, required: false, default: () => ({}) })
  details?: PlaceDetails;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
