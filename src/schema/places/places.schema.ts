import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class NamedDescription {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}
export const NamedDescriptionSchema = SchemaFactory.createForClass(NamedDescription);

@Schema()
export class Npc {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  title?: string;

  @Prop()
  image?: string;

  @Prop()
  descriptionHtml?: string;

  @Prop()
  personality?: string;
}
export const NpcSchema = SchemaFactory.createForClass(Npc);

@Schema()
export class PlaceDetails {
  @Prop()
  descriptionHtml?: string;

  @Prop()
  creatures?: string;

  @Prop()
  legendaryCreatures?: string;

  @Prop({ type: [NamedDescriptionSchema], default: [] })
  objects?: NamedDescription[];

  @Prop({ type: [NamedDescriptionSchema], default: [] })
  army?: NamedDescription[];

  @Prop({ type: [NamedDescriptionSchema], default: [] })
  placesOfInterest?: NamedDescription[];

  @Prop({ type: [NpcSchema], default: [] })
  npcs?: Npc[];
}
export const PlaceDetailsSchema = SchemaFactory.createForClass(PlaceDetails);

@Schema()
export class Place {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: false }) 
  imageUrl?: string;

  @Prop({ required: false })
  iconSize?: string;

  @Prop({ type: PlaceDetailsSchema, default: {} })
  details?: PlaceDetails;
}

export const PlaceSchema = SchemaFactory.createForClass(Place); 
