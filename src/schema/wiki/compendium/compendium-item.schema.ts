import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompendiumItemDocument = CompendiumItem & Document;

export type CompendiumItemCategory =
  | 'WEAPON'
  | 'ARMOR'
  | 'SHIELD'
  | 'AMMUNITION'
  | 'GEAR'
  | 'PACK'
  | 'TOOL'
  | 'INSTRUMENT';

@Schema({ timestamps: true })
export class CompendiumItem {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: [
      'WEAPON',
      'ARMOR',
      'SHIELD',
      'AMMUNITION',
      'GEAR',
      'PACK',
      'TOOL',
      'INSTRUMENT',
    ],
  })
  category: CompendiumItemCategory;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: '—' })
  cost: string;

  @Prop({ default: 0 })
  costInCopper: number;

  @Prop({ default: '—' })
  weight: string;

  // ==========================================
  // WEAPONS PROPERTIES (For character sheet & attack rolls)
  // ==========================================
  @Prop({ enum: ['armas_simples', 'armas_marciales'] })
  group?: string;

  @Prop({ default: false })
  melee?: boolean;

  @Prop({ default: false })
  finesse?: boolean;

  @Prop()
  damage?: string; // e.g. "1d4", "1d6", "1d8", "2d6", "1d10", "1d12"

  @Prop()
  damageDice?: number; // e.g. 1 or 2

  @Prop()
  damageDie?: number; // e.g. 4, 6, 8, 10, 12

  @Prop({ enum: ['perforante', 'cortante', 'contundente'] })
  damageType?: string;

  @Prop({ enum: ['P', 'T', 'C'] })
  damageTypeCode?: string;

  @Prop({ type: [String], default: [] })
  properties?: string[];

  @Prop()
  mastery?: string; // e.g. "acoso", "ataque-rapido", "derribo", "desequilibrar", "empuje", "frenar", "hendedura", "refilon"

  @Prop()
  masteryName?: string;

  @Prop()
  versatileDamage?: string; // e.g. "1d8", "1d10"

  @Prop()
  versatileDie?: number;

  @Prop()
  rangeNormal?: number; // e.g. 20, 80, 150

  @Prop()
  rangeLong?: number; // e.g. 60, 320, 600

  @Prop({ default: false })
  light?: boolean;

  @Prop({ default: false })
  heavy?: boolean;

  @Prop({ default: false })
  twoHanded?: boolean;

  @Prop({ default: false })
  reach?: boolean;

  @Prop({ default: false })
  thrown?: boolean;

  @Prop({ default: false })
  ammunition?: boolean;

  @Prop({ default: false })
  loading?: boolean;

  @Prop()
  special?: string;

  // ==========================================
  // ARMOR & SHIELDS
  // ==========================================
  @Prop({ enum: ['Ligera', 'Media', 'Pesada', 'Escudo'] })
  armorType?: string;

  @Prop()
  armorClass?: string; // Display text: e.g. "11 + DES", "13 + DES (máx. +2)", "18", "+2"

  @Prop()
  baseArmorClass?: number; // Base numeric AC: 11, 12, 13, 14, 15, 16, 17, 18, 2

  @Prop()
  maxDexBonus?: number; // 2 for Medias, undefined for Ligeras, 0 for Pesadas

  @Prop({ default: false })
  ignoresDex?: boolean; // true for Pesadas

  @Prop()
  strengthRequirement?: string; // e.g. "Fue 13", "Fue 15"

  @Prop()
  minStrength?: number; // 13, 15

  @Prop({ default: false })
  stealthDisadvantage?: boolean;

  // ==========================================
  // TOOLS, INSTRUMENTS, GEAR & PACKS
  // ==========================================
  @Prop()
  toolGroup?: string;

  @Prop({ default: 10 })
  maxUses?: number;

  @Prop()
  amount?: number; // Ammo quantity, e.g. 20

  @Prop()
  storedIn?: string;

  @Prop()
  contents?: string;
}

export const CompendiumItemSchema =
  SchemaFactory.createForClass(CompendiumItem);

