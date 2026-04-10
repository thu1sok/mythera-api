import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WikiHomeDocument = WikiHome & Document;

@Schema()
class PinnedSession {
  @Prop({ required: true })
  arcId: string;

  @Prop({ required: true })
  sessionId: string;
}

@Schema({ timestamps: true })
export class WikiHome {
  @Prop({ type: [PinnedSession], default: [] })
  pinnedSessions: PinnedSession[];
}

export const WikiHomeSchema = SchemaFactory.createForClass(WikiHome);
