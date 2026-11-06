import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CompendiumChoice,
  CompendiumDirectGrants,
  CompendiumPrerequisites,
} from './compendium-mechanics.types';

export type HumanTraitDocument = HumanTrait & Document;

@Schema({ timestamps: true })
export class HumanTrait {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: [1, 2, 3, 4], default: 1 })
  pointCost: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  repeatable: boolean;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: 'auto_awesome' })
  icon?: string;

  @Prop({ type: Object, default: {} })
  prerequisites: CompendiumPrerequisites;

  @Prop({ type: Object, default: {} })
  grants: CompendiumDirectGrants;

  @Prop({ type: Array, default: [] })
  choices: CompendiumChoice[];
}

export const HumanTraitSchema = SchemaFactory.createForClass(HumanTrait);
