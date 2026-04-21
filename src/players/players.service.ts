import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schema/wiki/player.schema';
import { Character, CharacterDocument } from '../schema/wiki/character.schema';

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>
    ) {}

    async create(data: Partial<Player>): Promise<Player> {
        const created = new this.playerModel(data);
        return created.save();
    }

    async findAll(): Promise<any[]> {
        const players = await this.playerModel.find().lean().exec();
        const playersWithCharacters = await Promise.all(players.map(async (player) => {
            const characters = await this.characterModel.find({ playerId: player._id })
                .populate('subraceId')
                .populate('currentPlaceId')
                .populate('deitiesIds')
                .populate('playerId')
                .populate('factionId')
                .lean()
                .exec();
            return { ...player, characters };
        }));
        return playersWithCharacters;
    }

    async findOne(id: string): Promise<any> {
        const player = await this.playerModel.findById(id).lean().exec();
        if (!player) return null;
        const characters = await this.characterModel.find({ playerId: player._id })
            .populate('subraceId')
            .populate('currentPlaceId')
            .populate('deitiesIds')
            .populate('playerId')
            .populate('factionId')
            .lean()
            .exec();
        return { ...player, characters };
    }

    async update(id: string, data: Partial<Player>): Promise<Player> {
        return this.playerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.playerModel.findByIdAndDelete(id).exec();
    }
}
