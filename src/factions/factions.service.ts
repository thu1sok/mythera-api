import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faction, FactionDocument } from '../schema/wiki/faction.schema';
import { Character, CharacterDocument } from '../schema/wiki/character.schema';

@Injectable()
export class FactionsService {
    constructor(
        @InjectModel(Faction.name) private model: Model<FactionDocument>,
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>
    ) {}

    async findAll(): Promise<Faction[]> {
        return this.model.find()
            .populate('placesIds')
            .populate('npcIds')
            .populate('characterIds')
            .exec();
    }

    async findOne(id: string): Promise<Faction> {
        return this.model.findById(id)
            .populate('placesIds')
            .populate('npcIds')
            .populate('characterIds')
            .exec();
    }

    async create(createDto: Partial<Faction>): Promise<Faction> {
        const created = new this.model(createDto);
        const saved = await created.save();

        if (saved.characterIds && saved.characterIds.length > 0) {
            await this.characterModel.updateMany(
                { _id: { $in: saved.characterIds } },
                { factionId: saved._id }
            );
        }

        return saved;
    }

    async update(id: string, updateDto: Partial<Faction>): Promise<Faction> {
        const oldFaction = await this.model.findById(id).exec();

        const updated = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
        if (!updated) throw new NotFoundException('Faction not found');

        if (updateDto.characterIds) {
            const oldChars = oldFaction?.characterIds?.map(c => c.toString()) || [];
            const newChars = updateDto.characterIds.map(c => c.toString());

            const added = newChars.filter(c => !oldChars.includes(c));
            const removed = oldChars.filter(c => !newChars.includes(c));

            if (added.length > 0) {
                await this.characterModel.updateMany(
                    { _id: { $in: added } },
                    { factionId: updated._id }
                );
            }

            if (removed.length > 0) {
                // Only unset if the character currently points to this faction
                await this.characterModel.updateMany(
                    { _id: { $in: removed }, factionId: updated._id },
                    { $unset: { factionId: 1 } }
                );
            }
        }

        return updated;
    }

    async remove(id: string): Promise<any> {
        // Unset factionId in all characters that belong to this faction
        await this.characterModel.updateMany(
            { factionId: id },
            { $unset: { factionId: 1 } }
        );

        return this.model.findByIdAndDelete(id).exec();
    }
}
