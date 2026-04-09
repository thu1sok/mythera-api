import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../schema/wiki/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Faction, FactionDocument } from '../schema/wiki/faction.schema';

@Injectable()
export class CharactersService {
    constructor(
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
        @InjectModel(Faction.name) private factionModel: Model<FactionDocument>
    ) {}

    async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
        const createdCharacter = new this.characterModel(createCharacterDto);
        const saved = await createdCharacter.save();

        // If character is created with a faction, add character to faction's characterIds
        if (saved.factionId) {
            await this.factionModel.findByIdAndUpdate(saved.factionId, {
                $addToSet: { characterIds: saved._id }
            });
        }

        return this.findOne(saved._id.toString());
    }

    async findAll(): Promise<Character[]> {
        return this.characterModel.find()
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .populate('playerId')
            .populate('factionId')
            .exec();
    }

    async findOne(id: string): Promise<Character> {
        const character = await this.characterModel.findById(id)
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .populate('playerId')
            .populate('factionId')
            .exec();
        if (!character) {
            throw new NotFoundException(`Character #${id} not found`);
        }
        return character;
    }

    async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
        const oldCharacter = await this.characterModel.findById(id).exec();
        
        const existingCharacter = await this.characterModel
            .findByIdAndUpdate(id, updateCharacterDto, { new: true })
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .populate('playerId')
            .populate('factionId')
            .exec();

        if (!existingCharacter) {
            throw new NotFoundException(`Character #${id} not found`);
        }

        // Handle bidirectional link with Faction
        if (oldCharacter && updateCharacterDto.factionId !== undefined) {
            const oldFactionId = oldCharacter.factionId?.toString();
            const newFactionId = updateCharacterDto.factionId?.toString();

            if (oldFactionId !== newFactionId) {
                // Remove from old faction
                if (oldFactionId) {
                    await this.factionModel.findByIdAndUpdate(oldFactionId, {
                        $pull: { characterIds: existingCharacter._id }
                    });
                }
                // Add to new faction
                if (newFactionId) {
                    await this.factionModel.findByIdAndUpdate(newFactionId, {
                        $addToSet: { characterIds: existingCharacter._id }
                    });
                }
            }
        }

        return existingCharacter;
    }

    async remove(id: string): Promise<Character> {
        const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
        if (!deletedCharacter) {
            throw new NotFoundException(`Character #${id} not found`);
        }

        // Remove from faction if linked
        if (deletedCharacter.factionId) {
            await this.factionModel.findByIdAndUpdate(deletedCharacter.factionId, {
                $pull: { characterIds: deletedCharacter._id }
            });
        }

        return deletedCharacter;
    }
}
