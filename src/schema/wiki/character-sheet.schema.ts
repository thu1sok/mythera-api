import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharacterSheetDocument = CharacterSheet & Document;

/**
 * La ficha de un personaje jugable.
 *
 * NO es la coleccion 'characters', que son los personajes de la wiki (lore
 * para el mapa: characterName, playerName, subraceId, factionId). Aquella es
 * narrativa; esta es mecanica, y la produce el creador.
 *
 * Esta partida en bloques a proposito:
 *
 *   identidad  lo que el jugador escribe al empezar
 *   build      lo que produce el creador. Solo cambia al subir de nivel.
 *   state      lo que cambia en mesa cada diez minutos.
 *   equipment  lo que lleva encima.
 *   overrides  lo unico que pisa un valor calculado (el master te quita el +2
 *              porque la espada se partio).
 *
 * Lo que NO se guarda: Clase de Armadura, Bonificador de Competencia,
 * Velocidad, Iniciativa y Puntos de Golpe maximos. Se calculan a partir de
 * build + los grants del compendio + equipment. Si se guardaran, el dia que
 * se corrija un grants todas las fichas quedarian desfasadas.
 *
 * El creador hace un POST al terminar. La ficha de mesa hara PATCH sobre
 * state, equipment y notes; build solo cambia al subir de nivel.
 */

export type Gender = 'el' | 'ella';

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
  /** Indice de la tanda elegida. -1 si las puntuaciones se metieron a mano. */
  chosenRound: number;
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
}

export interface Currency {
  po: number;
  pp: number;
  pc: number;
}

@Schema({ timestamps: true })
export class CharacterSheet {
  // --- identidad -----------------------------------------------------------
  /**
   * El jugador duenyo de la ficha, de la coleccion 'players'.
   * NO es unico: un jugador puede tener tantos personajes como quiera.
   * El indice esta para buscar sus fichas, no para restringir.
   */
  @Prop({ required: true, index: true })
  playerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  age: string;

  @Prop({ enum: ['el', 'ella'], default: 'el' })
  gender: Gender;

  /** URL de Cloudinary, igual que el resto de imagenes. */
  @Prop({ default: '' })
  portraitUrl: string;

  @Prop({ default: '' })
  description: string;

  // --- build ---------------------------------------------------------------
  @Prop({ type: Object, required: true })
  build: CharacterBuild;

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
