import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subrace, SubraceDocument } from '../schema/wiki/subrace.schema';

@Injectable()
export class SubracesService {
    constructor(@InjectModel(Subrace.name) private model: Model<SubraceDocument>) { }

    async findAll(): Promise<Subrace[]> {
        return this.model.find().exec();
    }

    async findByRace(raceId: string): Promise<Subrace[]> {
        return this.model.find({ raceId: new Types.ObjectId(raceId) }).exec();
    }

    async findOne(id: string): Promise<Subrace> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<Subrace>): Promise<Subrace> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<Subrace>): Promise<Subrace> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
