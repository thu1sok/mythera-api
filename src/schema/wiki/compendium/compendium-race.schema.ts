import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CompendiumChoice,
  CompendiumDirectGrants,
  FeatureBlock,
} from './compendium-mechanics.types';

export type CompendiumRaceDocument = CompendiumRace & Document;

/**
 * La contraparte mecanica de una raza.
 *
 * NO sustituye a las colecciones 'races' y 'subraces' de la wiki, que siguen
 * llevando el lore: nombre, imagen, descripcion y hereditaryTrait. Esto es lo
 * que lee el creador de personajes, igual que characterSheets sera la
 * contraparte mecanica de characters. Se enlazan por slug.
 *
 * Hoy solo existe 'humano'. El dia que entre otra raza es un documento mas,
 * con sus propias choices, sin tocar los estilos ni duplicar nada.
 */
@Schema({ timestamps: true })
export class CompendiumRace {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'person' })
  icon: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: '' })
  loreDescription: string;

  @Prop({ type: Array, default: [] })
  features: FeatureBlock[];

  @Prop({ type: Object, default: {} })
  grants: CompendiumDirectGrants;

  @Prop({ type: Array, default: [] })
  choices: CompendiumChoice[];
}

export const CompendiumRaceSchema = SchemaFactory.createForClass(CompendiumRace);
