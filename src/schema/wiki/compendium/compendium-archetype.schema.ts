import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CompendiumChoice,
  CompendiumDirectGrants,
} from './compendium-mechanics.types';

export type CompendiumArchetypeDocument = CompendiumArchetype & Document;

export interface ArchetypeLevelFeature {
  level: number; // Global character level: 3, 6, 10 (no multiclassing)
  title: string;
  description: string;
  subFeatures?: { title: string; description: string }[];
  grants?: CompendiumDirectGrants;
  choices?: CompendiumChoice[];
}

export interface CompanionStatBlock {
  name: string; // 'Animal terrestre' | 'Animal aéreo'
  examples: string;
  type: string;
  size: string;
  alignment: string;
  armorClass: string;
  hitPoints: string;
  hitDice: string;
  speed: string;
  stats: {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };
  senses: string;
  languages: string;
  proficiencyBonus: string;
  bondWithTrainer: string;
  flyby: string;
  beastAttack: string;
  attackBonus: string;
  attackDamage: string;
  damageType: string;
  charge: string;
}

export interface CombatManeuverOption {
  name: string;
  activation: string;
  effect: string;
}

export interface ArchetypeAppendix {
  type: 'ANIMAL_COMPANION' | 'COMBAT_MANEUVERS';
  title: string;
  introParagraphs: { title?: string; text: string }[];
  companionStats?: CompanionStatBlock[];
  maneuverProgressionTable?: {
    level: number;
    availableDice: number;
    dieType: string;
    knownManeuvers: number;
  }[];
  maneuvers?: CombatManeuverOption[];
  footerParagraphs?: { title?: string; text: string }[];
}

@Schema({ timestamps: true })
export class CompendiumArchetype {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'psychology' })
  icon: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ type: Array, default: [] })
  features: ArchetypeLevelFeature[];

  @Prop({ type: Object, required: false })
  appendix?: ArchetypeAppendix;

  @Prop({ type: Object, default: {} })
  grants: CompendiumDirectGrants;

  @Prop({ type: Array, default: [] })
  choices: CompendiumChoice[];
}

export const CompendiumArchetypeSchema =
  SchemaFactory.createForClass(CompendiumArchetype);
