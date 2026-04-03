import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
    @Prop({ required: true })
    characterName: string;

    @Prop({ required: true })
    playerName: string;

    @Prop()
    imageUrl: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subrace' })
    subraceId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Place' })
    currentPlaceId: Types.ObjectId;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'God' }])
    deitiesIds: Types.ObjectId[];

    @Prop()
    backstory: string;

    @Prop([String])
    eventsAndAchievements: string[];

    @Prop([String])
    plotItems: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
