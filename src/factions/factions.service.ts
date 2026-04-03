import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faction, FactionDocument } from '../schema/wiki/faction.schema';

@Injectable()
export class FactionsService {
    constructor(@InjectModel(Faction.name) private model: Model<FactionDocument>) {}

    async findAll(): Promise<Faction[]> {
        return this.model.find()
            .populate('placesIds')
            .populate('npcIds')
            .exec();
    }

    async findOne(id: string): Promise<Faction> {
        return this.model.findById(id)
            .populate('placesIds')
            .populate('npcIds')
            .exec();
    }

    async create(createDto: Partial<Faction>): Promise<Faction> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<Faction>): Promise<Faction> {
        const updated = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
        if (!updated) throw new NotFoundException('Faction not found');
        return updated;
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
