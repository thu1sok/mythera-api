import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: false }) 
  imageUrl?: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
