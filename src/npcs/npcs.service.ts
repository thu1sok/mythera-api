import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Npc, NpcDocument } from '../schema/wiki/npc.schema';
import { Place, PlaceDocument } from '../schema/places/places.schema';

@Injectable()
export class NpcsService {
    constructor(
        @InjectModel(Npc.name) private model: Model<NpcDocument>,
        @InjectModel(Place.name) private placeModel: Model<PlaceDocument>
    ) {}

    async findAll(): Promise<Npc[]> {
        return this.model.find().populate('placeId').exec();
    }

    async findOne(id: string): Promise<Npc> {
        return this.model.findById(id).populate('placeId').exec();
    }

    async create(createDto: Partial<Npc>): Promise<Npc> {
        if (createDto.placeId && typeof createDto.placeId === 'string') {
            createDto.placeId = new Types.ObjectId(createDto.placeId) as any;
        }

        const created = new this.model(createDto);
        const saved = await created.save();

        if (saved.placeId) {
            await this.placeModel.findByIdAndUpdate(
                saved.placeId,
                { $push: { 'details.npcs': saved._id } }
            ).exec();
        }

        return saved;
    }

    async update(id: string, updateDto: Partial<Npc>): Promise<Npc> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
