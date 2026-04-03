import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GodDocument = God & Document;

@Schema()
export class God {
    @Prop({ required: true })
    name: string;

    @Prop()
    imageUrl: string;

    @Prop()
    nickname: string;

    @Prop()
    domain: string;

    @Prop()
    legend: string;

    @Prop([String])
    prayers: string[];
}

export const GodSchema = SchemaFactory.createForClass(God);
