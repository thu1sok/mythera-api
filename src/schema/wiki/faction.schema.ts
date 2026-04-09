import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type FactionDocument = Faction & Document;

@Schema()
export class Faction {
    @Prop()
    imageUrl?: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    type?: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }], default: [] })
    placesIds?: Types.ObjectId[];

    @Prop()
    descriptionHtml?: string;

    @Prop({
        type: [{
            title: { type: String, required: true },
            description: { type: String, required: true }
        }], default: []
    })
    ranks?: { title: string, description: string }[];

    @Prop({
        type: [{
            title: { type: String, required: true },
            description: { type: String, required: true }
        }], default: []
    })
    factionTraits?: { title: string, description: string }[];

    @Prop({
        type: [{
            name: { type: String, required: true },
            quantity: { type: Number, required: true }
        }], default: []
    })
    troops?: { name: string, quantity: number }[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Npc' }], default: [] })
    npcIds?: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }], default: [] })
    characterIds?: Types.ObjectId[];
}

export const FactionSchema = SchemaFactory.createForClass(Faction);
