import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoricalEventDocument = HistoricalEvent & Document;

@Schema({ timestamps: true })
export class HistoricalEvent {
  @Prop({ required: true })
  name: string;

  @Prop()
  descriptionHtml: string;

  @Prop()
  imageUrl?: string;
}

export const HistoricalEventSchema = SchemaFactory.createForClass(HistoricalEvent);
