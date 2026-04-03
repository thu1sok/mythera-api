import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoricalEvent, HistoricalEventDocument } from '../schema/wiki/historical-event.schema';

@Injectable()
export class HistoricalEventsService {
    constructor(@InjectModel(HistoricalEvent.name) private model: Model<HistoricalEventDocument>) {}

    async findAll(): Promise<HistoricalEvent[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<HistoricalEvent> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<HistoricalEvent>): Promise<HistoricalEvent> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<HistoricalEvent>): Promise<HistoricalEvent> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
