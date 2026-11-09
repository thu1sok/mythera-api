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

/**
 * El equipo que se compra: armas, armaduras, municion, paquetes, utiles,
 * herramientas e instrumentos.
 *
 * Es la fuente unica de los articulos concretos. El catalogo
 * (COMPENDIUM_CATALOGS) se queda solo con los grupos de competencia
 * ('armas_simples', 'herramientas_artesano') y las listas fijas
 * (caracteristicas, habilidades, tipos de dano, maestrias). Un arma suelta
 * vive aqui y en ningun otro sitio.
 *
 * De aqui salen las dos tiendas: la inicial del creador filtrando por
 * costInCopper, y la secundaria de la ficha cuando existan los objetos
 * magicos.
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

  // --- precio y peso, comunes a todo ---------------------------------------
  /** Tal y como se muestra: '15 PO', '5 PP', '1 PC'. */
  @Prop({ default: '' })
  cost: string;

  /** El mismo precio en cobre, para ordenar y filtrar. -1 si varia. */
  @Prop({ default: 0 })
  costInCopper: number;

  /** En kilos. El SRD lo da en libras. */
  @Prop({ default: '' })
  weight: string;

  // --- armas ---------------------------------------------------------------
  @Prop({ required: false })
  damage?: string;

  @Prop({ required: false })
  damageType?: string;

  @Prop({ type: Array, default: undefined })
  properties?: string[];

  /** Clave de COMPENDIUM_CATALOGS.masteries: 'hendidura', 'roce', ... */
  @Prop({ required: false })
  mastery?: string;

  /** Grupo de competencia: 'armas_simples' o 'armas_marciales'. */
  @Prop({ required: false })
  group?: string;

  @Prop({ required: false })
  melee?: boolean;

  /** Tiene la propiedad Sutileza: entra en 'armas_marciales_sutileza'. */
  @Prop({ required: false })
  finesse?: boolean;

  /** Arma de fuego. Marcada por si alguna mesa no las quiere. */
  @Prop({ required: false })
  requiresGunpowder?: boolean;

  // --- armaduras y escudo --------------------------------------------------
  /** La cadena que se ensena: '14 + mod. Destreza (max. 2)', '18', '+2'. */
  @Prop({ required: false })
  armorClass?: string;

  /**
   * El mismo valor como numero, para calcular. En el escudo son los +2 que
   * suma, no una Clase de Armadura.
   */
  @Prop({ required: false })
  baseArmorClass?: number;

  /**
   * El tope de modificador de Destreza: 2 en las Medias. Ausente en las
   * Ligeras, que lo suman entero, y en las Pesadas, que lo ignoran.
   *
   * Un modificador NEGATIVO si resta, tambien con tope: min(mod, 2).
   */
  @Prop({ required: false })
  maxDexBonus?: number;

  /**
   * La armadura ignora la Destreza en los DOS sentidos. Es el caso de las
   * Pesadas: una cota de malla da 16 con Destreza 8 y con Destreza 18.
   * No es lo mismo que maxDexBonus: 0, que si dejaria restar un negativo.
   */
  @Prop({ required: false })
  ignoresDex?: boolean;

  /** 'Ligera' | 'Media' | 'Pesada' | 'Escudo'. */
  @Prop({ required: false })
  armorType?: string;

  @Prop({ required: false })
  strengthRequirement?: string;

  @Prop({ required: false })
  stealthDisadvantage?: boolean;

  // --- municion ------------------------------------------------------------
  @Prop({ required: false })
  amount?: number;

  @Prop({ required: false })
  storedIn?: string;

  // --- paquetes ------------------------------------------------------------
  @Prop({ required: false })
  contents?: string;

  // --- herramientas e instrumentos ----------------------------------------
  /**
   * Con que grupo de COMPENDIUM_CATALOGS.tools se corresponde: la tienda
   * vende objetos sueltos y las competencias van por familias. Sin esto no
   * hay forma de saber si tienes competencia con lo que compras.
   *
   * Los juegos (Dados, Cartas) no lo llevan: el catalogo no tiene una
   * competencia para ellos.
   */
  @Prop({ required: false })
  toolGroup?: string;
}

export const CompendiumItemSchema = SchemaFactory.createForClass(CompendiumItem);
