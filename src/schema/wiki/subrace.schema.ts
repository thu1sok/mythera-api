import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type SubraceDocument = Subrace & Document;

@Schema()
export class Subrace {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true })
    raceId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop()
    imageUrl: string;

    @Prop()
    description: string;

    @Prop()
    size: string;

    @Prop()
    age: string;

    @Prop()
    language: string;

    @Prop({ type: Object })
    stats: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };

    @Prop()
    speed: string;

    @Prop([
        {
            title: { type: String, required: true },
            description: { type: String, required: true }
        }
    ])
    passiveTraits: { title: string; description: string }[];

    @Prop([
        {
            title: { type: String, required: true },
            description: { type: String, required: true }
        }
    ])
    activeTraits: { title: string; description: string }[];
}

export const SubraceSchema = SchemaFactory.createForClass(Subrace);
