import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CompendiumChoice,
  CompendiumDirectGrants,
  CompendiumPrerequisites,
  FeatureBlock,
} from './compendium-mechanics.types';

export type CompendiumFeatDocument = CompendiumFeat & Document;
export type FeatCategory = 'ORIGIN' | 'GENERAL';

@Schema({ timestamps: true })
export class CompendiumFeat {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['ORIGIN', 'GENERAL'] })
  category: FeatCategory;

  @Prop({ default: '' })
  loreDescription: string;

  @Prop({ default: '' })
  prerequisiteText: string;

  @Prop({ default: false })
  repeatable: boolean;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: 'military_tech' })
  icon?: string;

  @Prop({ type: Array, default: [] })
  features: FeatureBlock[];

  @Prop({ type: Object, default: {} })
  prerequisites: CompendiumPrerequisites;

  @Prop({ type: Object, default: {} })
  grants: CompendiumDirectGrants;

  @Prop({ type: Array, default: [] })
  choices: CompendiumChoice[];
}

export const CompendiumFeatSchema = SchemaFactory.createForClass(CompendiumFeat);
