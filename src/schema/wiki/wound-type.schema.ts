import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ModifierLine } from './character-sheet.schema';

export type WoundTypeDocument = WoundType & Document;

/**
 * Catalogo de tipos de herida (BRIEFING-FICHA-COMPLETA §3): «Ciego»,
 * «Tuerto»... para que el siguiente que se quede ciego lo elija en vez de
 * escribirlo otra vez. Los crea y los borra cualquiera.
 *
 * Al aplicar uno a una ficha se COPIAN sus modificadores dentro (state.
 * modifierPacks): si alguien borra «Ciego» del catalogo, quien lo tenia
 * sigue ciego. Ninguna ficha depende de esta coleccion.
 */
@Schema({ timestamps: true })
export class WoundType {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: Array, default: [] })
  modifiers: ModifierLine[];

  /** Se lo lleva el descanso largo. Por defecto false: permanente. */
  @Prop({ default: false })
  untilLongRest: boolean;
}

export const WoundTypeSchema = SchemaFactory.createForClass(WoundType);
