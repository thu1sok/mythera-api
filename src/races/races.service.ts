import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Race, RaceDocument } from '../schema/wiki/race.schema';

@Injectable()
export class RacesService {
    constructor(@InjectModel(Race.name) private model: Model<RaceDocument>) { }

    async findAll(): Promise<Race[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<Race> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<Race>): Promise<Race> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<Race>): Promise<Race> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
