import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type NpcDocument = Npc & Document;

@Schema()
export class Npc {
    @Prop({ required: true })
    name: string;

    @Prop()
    title?: string;

    @Prop()
    imageUrl?: string;

    @Prop()
    descriptionHtml?: string;

    @Prop()
    personality?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Place' })
    placeId?: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Faction' })
    factionId?: Types.ObjectId;
}

export const NpcSchema = SchemaFactory.createForClass(Npc);
