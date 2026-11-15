import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type CharacterDocument = Character & Document;

/** Los dos valores que ofrece el creador. */
export type Gender = 'el' | 'ella';

@Schema()
export class Character {
    @Prop({ required: true })
    characterName: string;

    @Prop({ required: true })
    playerName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
    playerId: Types.ObjectId;

    @Prop()
    imageUrl: string;

    /** Texto libre, como en el creador ('12', 'unos cuarenta'...). */
    @Prop({ default: '' })
    age: string;

    /** Sin valor por defecto: un personaje viejo no tiene genero decidido. */
    @Prop({ enum: ['el', 'ella'] })
    gender?: Gender;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subrace' })
    subraceId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Place' })
    currentPlaceId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Faction' })
    factionId: Types.ObjectId;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'God' }])
    deitiesIds: Types.ObjectId[];

    @Prop()
    backstory: string;
    
    @Prop([{
        name: { type: String, required: true },
        level: { type: Number, required: true, default: 1 }
    }])
    characterClasses: { name: string, level: number }[];

    @Prop({ default: false })
    isDead: boolean;

    @Prop([String])
    eventsAndAchievements: string[];

    @Prop([String])
    plotItems: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
