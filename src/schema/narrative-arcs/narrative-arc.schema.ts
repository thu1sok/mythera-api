import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NarrativeArcDocument = NarrativeArc & Document;

@Schema()
export class Content {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  initialSummary: string;

  @Prop({ required: true })
  finalSummary: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

@Schema()
export class Player {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  character: string;

  @Prop({ required: true })
  level: number;

  @Prop({ type: Types.ObjectId, ref: 'Character', required: false })
  characterId?: Types.ObjectId;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class Session {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['Campaña', 'Quest', 'Oneshot', 'Bishot'] })
  type: string;

  @Prop({ required: true })
  startLevel: string;

  @Prop({ type: [PlayerSchema], default: [] })
  players: Player[];

  @Prop({ type: [ContentSchema], default: [] })
  contents: Content[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Place' }], default: [] })
  relatedPlaces: Types.ObjectId[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);

@Schema({ timestamps: true })
export class NarrativeArc {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  descriptionHtml: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: [SessionSchema], default: [] })
  sessions: Session[];
}

export const NarrativeArcSchema = SchemaFactory.createForClass(NarrativeArc);
