import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NarrativeArcDocument = NarrativeArc & Document;

@Schema({ _id: true })
export class Content {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  initialSummary: string;

  @Prop({ required: true })
  finalSummary: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

@Schema({ _id: true })
export class Player {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  character: string;

  @Prop({ required: true })
  level: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema({ _id: true })
export class Session {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true, enum: ['Campaña', 'Quest', 'Oneshot', 'Bishot'] })
  type: string;

  @Prop({ required: true })
  startLevel: number;

  @Prop({ type: [PlayerSchema], default: [] })
  players: Player[];

  @Prop({ type: [ContentSchema], default: [] })
  contents: Content[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);

@Schema({ timestamps: true })
export class NarrativeArc {
  @Prop()
  _id: Types.ObjectId;

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
