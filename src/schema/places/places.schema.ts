import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Npc' }], default: [] })
  npcs?: Types.ObjectId[];
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
