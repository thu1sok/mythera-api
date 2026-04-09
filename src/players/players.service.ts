import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schema/wiki/player.schema';

@Injectable()
export class PlayersService {
    constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

    async create(data: Partial<Player>): Promise<Player> {
        const created = new this.playerModel(data);
        return created.save();
    }

    async findAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async findOne(id: string): Promise<Player> {
        return this.playerModel.findById(id).exec();
    }

    async update(id: string, data: Partial<Player>): Promise<Player> {
        return this.playerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.playerModel.findByIdAndDelete(id).exec();
    }
}
