import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EternalDocument = Eternal & Document;

@Schema()
export class Eternal {
    @Prop({ required: true })
    name: string;

    @Prop()
    imageUrl: string;

    @Prop()
    nickname: string;

    @Prop()
    legend: string;

    @Prop()
    presence: string;
}

export const EternalSchema = SchemaFactory.createForClass(Eternal);
