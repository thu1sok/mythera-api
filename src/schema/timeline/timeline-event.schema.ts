import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { TimelineEra } from './timeline-era.schema';

export type TimelineEventDocument = TimelineEvent & Document;

@Schema()
export class TimelineEvent {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    year: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TimelineEra', required: true })
    eraId: Types.ObjectId | TimelineEra;
}

export const TimelineEventSchema = SchemaFactory.createForClass(TimelineEvent);
