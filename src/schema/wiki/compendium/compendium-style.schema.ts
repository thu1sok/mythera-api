import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CompendiumChoice,
  CompendiumDirectGrants,
} from './compendium-mechanics.types';

export type CompendiumStyleDocument = CompendiumStyle & Document;

export interface StyleLevelFeature {
  level: number; // Global character level 1..12
  title: string;
  description: string;
  isArchetypeSlot?: boolean;
  isGeneralFeatSlot?: boolean;
  grants?: CompendiumDirectGrants;
  choices?: CompendiumChoice[];
}

export interface StyleInitialTraits {
  hitDie: string; // e.g. '1d12' or '1d10'
  hpLevel1: string; // e.g. '12 + tu modificador de Constitución.'
  hpLevel1Base: number; // 12 or 10
  hpHigherLevels: string; // e.g. '1d12 + tu modificador de Constitución por cada nivel posterior al primero.'
  // abilityScoreImprovement se ha ido a la raza (compendiumraces -> 'humano').
  // Estaba repetido en los tres estilos y va atado a ser humano, asi que el
  // dia que entre otra raza habria que duplicarlo y condicionarlo aqui.
  armorProficiencies: string;
  shieldProficiency: string;
  weaponProficiencies: string;
  toolProficiencies: string;
  skillProficienciesText: string;
  skillChoicesCount: number;
}

@Schema({ timestamps: true })
export class CompendiumStyle {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'shield' })
  icon: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ type: Object, required: true })
  initialTraits: StyleInitialTraits;

  @Prop({ type: Array, default: [] })
  progression: StyleLevelFeature[];

  @Prop({ type: Object, default: {} })
  grants: CompendiumDirectGrants;

  @Prop({ type: Array, default: [] })
  choices: CompendiumChoice[];
}

export const CompendiumStyleSchema = SchemaFactory.createForClass(CompendiumStyle);
