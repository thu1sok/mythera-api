import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RaceDocument = Race & Document;

@Schema()
export class Race {
    @Prop({ required: true })
    name: string;

    @Prop()
    imageUrl: string;

    @Prop()
    description: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
