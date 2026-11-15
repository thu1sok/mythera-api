import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompendiumConditionDocument = CompendiumCondition & Document;

// Las tres familias de los filtros de la wiki: «Físicos», «Sensoriales y
// Mentales» e «Incapacitantes».
export type ConditionCategory = 'FISICO' | 'SENSORIAL' | 'INCAPACITANTE';

/**
 * Un nivel de la tabla del Agotamiento. Los modificadores van con su signo y
 * se suman, como los `grants` de los rasgos (`speedBonus: 5`): −1 es `-1`.
 */
export interface ConditionLevel {
  level: number;
  /** Se suma a todas las pruebas de d20: ataques, salvaciones, pruebas e iniciativa. */
  d20Modifier?: number;
  /** Pies que se suman a la Velocidad (negativo: la reduce). */
  speedModifier?: number;
  /** Este nivel mata: el 6 del Agotamiento. */
  death?: boolean;
}

/**
 * Los efectos de un estado, en campos. La ficha:
 * - aplica a los números y al tirador los que tocan las tiradas del jugador:
 *   speedZero, disadvantageOnAttacks, disadvantageOnAbilityChecks,
 *   disadvantageOnDexSaves, disadvantageOnInitiative, autoFailStrDexSaves,
 *   implies y levels;
 * - enseña sin aplicarlos, diciendo que los lleva el máster, los demás: los
 *   de quien te ataca, noActions y noConcentration, y los fallos de vista y
 *   oído (la ficha no sabe qué prueba los requiere).
 * Asustado, Influenciado y Oculto dependen de la posición y de la línea de
 * visión y van vacíos a propósito; Agarrado solo lleva la Velocidad 0.
 */
export interface ConditionMechanics {
  /** La Velocidad es 0 y no puede aumentar. */
  speedZero?: boolean;
  disadvantageOnAttacks?: boolean;
  disadvantageOnAbilityChecks?: boolean;
  disadvantageOnDexSaves?: boolean;
  /** Todos los atacantes, a cualquier distancia. */
  advantageForAttackersAgainstYou?: boolean;
  /** Solo los atacantes a 5 pies o menos (Derribado). */
  advantageForAttackersWithin5ft?: boolean;
  /** Los atacantes a más de 5 pies (Derribado). */
  disadvantageForAttackersBeyond5ft?: boolean;
  /** Inconsciente y Paralizado. */
  critsAgainstYouWithin5ft?: boolean;
  autoFailStrDexSaves?: boolean;
  autoFailSightChecks?: boolean;
  autoFailHearingChecks?: boolean;
  /** Ni Acción, ni Acción Adicional, ni Reacción. */
  noActions?: boolean;
  noConcentration?: boolean;
  disadvantageOnInitiative?: boolean;
  /**
   * Slugs de otros estados que arrastra, que aportan también sus efectos
   * (Inconsciente → incapacitado y derribado). Los efectos se combinan: una
   * Ventaja y una Desventaja juntas se anulan.
   */
  implies?: string[];
  /** Tabla por niveles (el Agotamiento). */
  levels?: ConditionLevel[];
}

/** Una tabla tal como la enseña la wiki. */
export interface ConditionTable {
  headers: string[];
  rows: string[][];
}

@Schema({ timestamps: true })
export class CompendiumCondition {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['FISICO', 'SENSORIAL', 'INCAPACITANTE'] })
  category: ConditionCategory;

  @Prop({ default: '' })
  badge: string;

  @Prop({ default: 'warning_amber' })
  icon?: string;

  @Prop({ default: '' })
  description: string;

  /** Las viñetas de la wiki, literales. */
  @Prop({ type: [String], default: [] })
  effects: string[];

  /** La tabla de la wiki, literal (solo el Agotamiento la tiene). */
  @Prop({ type: Object })
  table?: ConditionTable;

  @Prop({ type: Object, default: {} })
  mechanics: ConditionMechanics;

  @Prop({ default: false })
  isDefault: boolean;
}

export const CompendiumConditionSchema =
  SchemaFactory.createForClass(CompendiumCondition);
