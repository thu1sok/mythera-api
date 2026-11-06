import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaceDetailsSchema, PlaceDetails } from './places.schema';

export type DurmientePlaceDocument = DurmientePlace & Document;

@Schema({ collection: 'durmiente_places', timestamps: true })
export class DurmientePlace {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false })
  iconSize?: string;

  @Prop({ type: PlaceDetailsSchema, default: () => ({}) })
  details?: PlaceDetails;
}

export const DurmientePlaceSchema = SchemaFactory.createForClass(DurmientePlace);
