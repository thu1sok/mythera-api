import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RuleDocument = Rule & Document;

@Schema({ timestamps: true })
export class Rule {
  @Prop({ required: true })
  name: string;

  @Prop()
  descriptionHtml: string;

  @Prop()
  imageUrl?: string;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
