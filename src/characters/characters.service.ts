import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../schema/wiki/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
    constructor(
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>
    ) {}

    async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
        const createdCharacter = new this.characterModel(createCharacterDto);
        return createdCharacter.save();
    }

    async findAll(): Promise<Character[]> {
        return this.characterModel.find()
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .exec();
    }

    async findOne(id: string): Promise<Character> {
        const character = await this.characterModel.findById(id)
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .exec();
        if (!character) {
            throw new NotFoundException(`Character #${id} not found`);
        }
        return character;
    }

    async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
        const existingCharacter = await this.characterModel
            .findByIdAndUpdate(id, updateCharacterDto, { new: true })
            .exec();

        if (!existingCharacter) {
            throw new NotFoundException(`Character #${id} not found`);
        }
        return existingCharacter;
    }

    async remove(id: string): Promise<Character> {
        const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
        if (!deletedCharacter) {
            throw new NotFoundException(`Character #${id} not found`);
        }
        return deletedCharacter;
    }
}
