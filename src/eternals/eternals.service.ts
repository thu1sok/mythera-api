import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Eternal, EternalDocument } from '../schema/wiki/eternal.schema';

@Injectable()
export class EternalsService {
    constructor(@InjectModel(Eternal.name) private model: Model<EternalDocument>) { }

    async findAll(): Promise<Eternal[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<Eternal> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<Eternal>): Promise<Eternal> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<Eternal>): Promise<Eternal> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
