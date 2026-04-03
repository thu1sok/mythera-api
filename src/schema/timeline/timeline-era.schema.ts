import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimelineEraDocument = TimelineEra & Document;

@Schema()
export class TimelineEra {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    order: number;
}

export const TimelineEraSchema = SchemaFactory.createForClass(TimelineEra);
