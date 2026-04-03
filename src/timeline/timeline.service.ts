import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimelineEra, TimelineEraDocument } from '../schema/timeline/timeline-era.schema';
import { TimelineEvent, TimelineEventDocument } from '../schema/timeline/timeline-event.schema';

@Injectable()
export class TimelineService {
    constructor(
        @InjectModel(TimelineEra.name)
        private timelineEraModel: Model<TimelineEraDocument>,
        @InjectModel(TimelineEvent.name)
        private timelineEventModel: Model<TimelineEventDocument>,
    ) { }

    // Eras
    async createEra(data: Partial<TimelineEra>): Promise<TimelineEra> {
        const newEra = new this.timelineEraModel(data);
        return newEra.save();
    }

    async findAllEras(): Promise<TimelineEra[]> {
        return this.timelineEraModel.find().sort({ order: 1 }).lean().exec();
    }

    async updateEra(id: string, data: Partial<TimelineEra>): Promise<TimelineEra> {
        const era = await this.timelineEraModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!era) throw new NotFoundException('Era not found');
        return era;
    }

    async deleteEra(id: string): Promise<void> {
        const result = await this.timelineEraModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Era not found');

        // Also delete associated events
        await this.timelineEventModel.deleteMany({ eraId: id }).exec();
    }

    // Events
    async createEvent(data: Partial<TimelineEvent>): Promise<TimelineEvent> {
        const newEvent = new this.timelineEventModel(data);
        return newEvent.save();
    }

    async findAllEvents(): Promise<TimelineEvent[]> {
        return this.timelineEventModel.find().populate('eraId').lean().exec();
    }

    async updateEvent(id: string, data: Partial<TimelineEvent>): Promise<TimelineEvent> {
        const event = await this.timelineEventModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async deleteEvent(id: string): Promise<void> {
        const result = await this.timelineEventModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Event not found');
    }
}
