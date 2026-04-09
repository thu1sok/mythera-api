import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
    @Prop({ required: true })
    name: string;

    @Prop()
    imageUrl: string;

    @Prop()
    description: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
