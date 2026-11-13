import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type CharacterSheetDocument = CharacterSheet & Document;

/**
 * La parte mecanica de un personaje jugable.
 *
 * El personaje es el documento de 'characters' (BRIEFING-JUGADORES §2): ahi
 * vive todo lo que un personaje tiene SIN ficha (nombre, retrato, edad,
 * genero, lugar, organizacion, deidades, trasfondo, eventos, objetos de la
 * trama). Esta coleccion guarda SOLO mecanica, y nace cuando alguien empieza
 * el creador para ese personaje. Por eso no hay aqui nombre ni retrato: si
 * estuvieran en los dos sitios, uno se quedaria viejo.
 *
 * Bloques:
 *
 *   build      lo que produce el creador. Solo cambia al subir de nivel.
 *              Mientras el creador esta a medias puede faltar, o faltarle
 *              campos: 'completed' dice si esta terminado.
 *   state      lo que cambia en mesa cada diez minutos.
 *   equipment  lo que lleva encima.
 *   overrides  lo unico que pisa un valor calculado (el master te quita el +2
 *              porque la espada se partio).
 *
 * Lo que NO se guarda: Clase de Armadura, Bonificador de Competencia,
 * Velocidad, Iniciativa y Puntos de Golpe maximos. Se calculan a partir de
 * build + los grants del compendio + equipment. Si se guardaran, el dia que
 * se corrija un grants todas las fichas quedarian desfasadas.
 */

/**
 * Lo que se GUARDA por competencia. 'media' no esta aqui a proposito: el
 * Erudito no concede media competencia en una habilidad concreta, sino en
 * todas aquellas en las que NO tengas competencia. Es una regla de calculo,
 * no un estado de cada habilidad.
 */
export type ProficiencyLevel = 'competente' | 'pericia';

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

/** Una eleccion del compendio ya resuelta. */
export interface ResolvedChoice {
  /** El id de la choice, tal cual viene del compendio. */
  choiceId: string;
  /** De donde salia: 'humano', 'versatil', 'alerta'... */
  sourceSlug: string;
  /**
   * Distingue dos elecciones del mismo choiceId cuando la fuente es
   * repetible: 'habilidoso#1', 'habilidoso#2', 'versado#1'. Sin esto, dos
   * Habilidoso producen dos entradas identicas que solo se distinguen por el
   * orden del array, que no es sitio donde guardar informacion.
   */
  instanceKey?: string;
  /** Lo elegido: claves del catalogo o slugs de colecciones. */
  selected: string[];
}

export interface Proficiency {
  /** 'SKILL' | 'TOOL' | 'INSTRUMENT' | 'WEAPON' | 'ARMOR' | 'SHIELD' | 'SAVING_THROW' */
  category: string;
  /** Clave del catalogo o slug del objeto. */
  value: string;
  level: ProficiencyLevel;
  /** De donde viene, para poder explicarlo en la ficha. */
  sourceSlug?: string;
}

export interface CharacterBuild {
  level: number;
  raceSlug: string;
  /**
   * Las tandas de 4d6, cada una con sus seis puntuaciones ya sumadas. Se
   * guardan todas, aunque solo se use una, para que el master vea que salio.
   */
  rolledRounds: number[][];
  /**
   * Los dados de cada tanda: los cuatro que salieron y cual se descarto, en
   * el mismo orden que rolledRounds. Las tiradas son hechos: se guardan en el
   * momento de tirar, no al terminar (si no, salir y volver a entrar daria
   * otra tirada y el limite de tandas no existiria).
   */
  rolledDice?: { dice: number[]; droppedIndex: number }[][];
  /** Indice de la tanda elegida. -1 si no hay o si se metieron a mano. */
  chosenRound: number;
  /**
   * Que valor de la tanda elegida va a cada caracteristica: indice dentro de
   * la tanda, por clave (STR, DEX...). Sin esto el paso 2 no se puede
   * reconstruir al volver: abilityScores ya lleva la Mejora sumada.
   */
  abilityAssignment?: Record<string, number | null>;
  /** Las puntuaciones metidas a mano, antes de la Mejora. Solo en ese modo. */
  manualScores?: Record<string, number | null>;
  /** Los valores finales, ya con la Mejora de Caracteristica aplicada. */
  abilityScores: AbilityScores;
  /**
   * Lo que salio en el Dado de Golpe en cada nivel a partir del 2: una
   * entrada por nivel, en orden. El nivel 1 no va aqui porque es fijo
   * (12 o 10 segun el Estilo). Sin esto, los Puntos de Golpe maximos no se
   * pueden recalcular, y recalcularlos es justo lo que queremos poder hacer.
   */
  hitPointRolls: number[];
  /** Los rasgos humanos elegidos con los 4 puntos. */
  traitSlugs: string[];
  /**
   * Una, o dos con el rasgo Experimentado. Es un array por eso: con
   * originFeatSlug a secas, la segunda dote solo existia dentro de choices.
   */
  originFeatSlugs: string[];
  styleSlug: string;
  combatTechniqueSlugs: string[];
  /** Se elige a nivel 3. */
  archetypeSlug?: string;
  generalFeatSlugs: string[];
  maneuverSlugs: string[];
  /** Slugs de compendiumitems: que armas tienes en Maestria. */
  weaponMasterySlugs: string[];
  choices: ResolvedChoice[];
  proficiencies: Proficiency[];
}

export interface DeathSaves {
  successes: number;
  failures: number;
}

/** Usos gastados de un recurso: Segundo Aliento, Dados de Superioridad... */
export interface ResourceUse {
  slug: string;
  used: number;
}

export interface CharacterState {
  hpCurrent: number;
  hpTemp: number;
  hitDiceSpent: number;
  resources: ResourceUse[];
  heroicInspiration: boolean;
  conditions: string[];
  exhaustion: number;
  deathSaves: DeathSaves;
}

export interface EquippedItem {
  /** Slug de compendiumitems. */
  itemSlug: string;
  quantity: number;
  equipped: boolean;
  /** Para objetos que no estan en el compendio. */
  customName?: string;
  notes?: string;
  /**
   * Usos que quedan, solo en los objetos con maxUses (Herramientas y
   * Materiales). El tope es maxUses x quantity: comprar otro sube la cantidad
   * y el tope. Ausente = lleno. Simplifica el documento (10 usos POR unidad):
   * ver mythera-map-app/src/app/core/rules/item-uses.ts.
   */
  usesLeft?: number;
}

export interface Currency {
  po: number;
  pp: number;
  pc: number;
}

@Schema({ timestamps: true })
export class CharacterSheet {
  // --- a quien pertenece ---------------------------------------------------
  /**
   * El personaje de 'characters' del que esta ficha es la mecanica. Una
   * ficha siempre pertenece a un personaje; un personaje puede no tener
   * ficha, y tiene como mucho una (indice unico).
   *
   * No hay playerId: el jugador es el del personaje. Guardarlo aqui tambien
   * haria que se quedara viejo el dia que el personaje cambie de jugador.
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
    unique: true,
  })
  characterId: Types.ObjectId;

  /** false mientras el creador esta a medias. Las fichas solo se abren con true. */
  @Prop({ default: false })
  completed: boolean;

  // --- build ---------------------------------------------------------------
  /** Opcional y parcial mientras completed sea false. */
  @Prop({ type: Object })
  build?: Partial<CharacterBuild>;

  // --- lo que cambia en mesa -----------------------------------------------
  @Prop({ type: Object, default: {} })
  state: CharacterState;

  @Prop({ type: Array, default: [] })
  equipment: EquippedItem[];

  @Prop({ type: Object, default: { po: 0, pp: 0, pc: 0 } })
  currency: Currency;

  /**
   * Lo unico que pisa un valor calculado. Clave libre a proposito: el master
   * decide que ajusta y por que.
   */
  @Prop({ type: Object, default: {} })
  overrides: Record<string, unknown>;

  @Prop({ default: '' })
  notes: string;
}

export const CharacterSheetSchema =
  SchemaFactory.createForClass(CharacterSheet);
