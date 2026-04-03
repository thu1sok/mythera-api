import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { God, GodDocument } from '../schema/wiki/god.schema';

@Injectable()
export class GodsService {
    constructor(@InjectModel(God.name) private model: Model<GodDocument>) { }

    async findAll(): Promise<God[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<God> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<God>): Promise<God> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<God>): Promise<God> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
