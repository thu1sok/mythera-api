import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompendiumItemDocument = CompendiumItem & Document;

  export type ItemCategory =
  | 'WEAPON'
  | 'ARMOR'
  | 'SHIELD'
  | 'AMMUNITION'
  | 'GEAR'
  | 'PACK'
  | 'TOOL'
  | 'INSTRUMENT';

export type CompendiumItemCategory = ItemCategory;

/**
 * El equipo que se compra: armas, armaduras, munición, paquetes, útiles,
 * herramientas e instrumentos.
 *
 * Es la fuente única de los artículos concretos. El catálogo
 * (COMPENDIUM_CATALOGS) se queda solo con los grupos de competencia
 * ('armas_simples', 'herramientas_artesano') y las listas fijas
 * (características, habilidades, tipos de daño, maestrías).
 */
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
  category: ItemCategory;

  @Prop({ default: false })
  isDefault: boolean;

  /** Tal y como se muestra: '15 PO', '2 po', '5 PP', '1 PC'. */
  @Prop({ default: '—' })
  cost: string;

  /** Precio en cobre, para ordenar y filtrar. -1 si varía. 1 PO = 100 PC. */
  @Prop({ default: 0 })
  costInCopper: number;

  /** En kilos. */
  @Prop({ default: '—' })
  weight: string;

  // ==========================================
  // ARMAS (Propiedades para hoja de personaje y tiradas)
  // ==========================================
  /** Grupo de competencia: 'armas_simples' o 'armas_marciales'. */
  @Prop({ enum: ['armas_simples', 'armas_marciales'] })
  group?: string;

  @Prop({ default: false })
  melee?: boolean;

  /** Tiene la propiedad Sutileza / Sutil: permite usar Fuerza o Destreza. */
  @Prop({ default: false })
  finesse?: boolean;

  /** Arma de fuego. */
  @Prop({ default: false })
  requiresGunpowder?: boolean;

  @Prop()
  damage?: string; // e.g. "1d4", "1d6", "1d8", "2d6", "1d10", "1d12"

  @Prop()
  damageDice?: number; // e.g. 1 o 2

  @Prop()
  damageDie?: number; // e.g. 4, 6, 8, 10, 12

  @Prop({ enum: ['perforante', 'cortante', 'contundente'] })
  damageType?: string;

  @Prop({ enum: ['P', 'T', 'C'] })
  damageTypeCode?: string;

  @Prop({ type: [String], default: [] })
  properties?: string[];

  /** Clave de COMPENDIUM_CATALOGS.masteries: 'acoso', 'ataque-rapido', 'derribo', etc. */
  @Prop()
  mastery?: string;

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
  // ARMADURAS Y ESCUDO
  // ==========================================
  /** 'Ligera' | 'Media' | 'Pesada' | 'Escudo'. */
  @Prop({ enum: ['Ligera', 'Media', 'Pesada', 'Escudo'] })
  armorType?: string;

  /** La cadena que se enseña: '11 + DES', '14 + mod. Destreza (máx. 2)', '18', '+2'. */
  @Prop()
  armorClass?: string;

  /** Base numérica de CA (o +2 en el escudo). */
  @Prop()
  baseArmorClass?: number;

  /** Tope del modificador de Destreza (2 en Medias). */
  @Prop()
  maxDexBonus?: number;

  /** La armadura ignora la Destreza en ambos sentidos (Pesadas). */
  @Prop({ default: false })
  ignoresDex?: boolean;

  @Prop()
  strengthRequirement?: string; // e.g. "Fue 13", "Fue 15"

  @Prop()
  minStrength?: number;

  @Prop({ default: false })
  stealthDisadvantage?: boolean;

  // ==========================================
  // HERRAMIENTAS, INSTRUMENTOS, ÚTILES Y PAQUETES
  // ==========================================
  /** Grupo de COMPENDIUM_CATALOGS.tools al que corresponde. */
  @Prop()
  toolGroup?: string;

  @Prop({ default: 10 })
  maxUses?: number;

  // Munición
  @Prop()
  amount?: number;

  @Prop()
  storedIn?: string;

  // Paquetes
  @Prop()
  contents?: string;
}

export const CompendiumItemSchema =
  SchemaFactory.createForClass(CompendiumItem);
