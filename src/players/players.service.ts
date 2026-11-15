import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schema/wiki/player.schema';
import { Character, CharacterDocument } from '../schema/wiki/character.schema';
import { CharacterSheet, CharacterSheetDocument } from '../schema/wiki/character-sheet.schema';

/**
 * Lo que la lista del jugador necesita saber de la ficha de cada personaje
 * para decidir sus botones (BRIEFING-JUGADORES §6), sin pedir una ficha por
 * tarjeta. null si el personaje no tiene ficha.
 */
export interface SheetSummary {
    _id: string;
    completed: boolean;
    level: number | null;
}

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
        @InjectModel(CharacterSheet.name) private sheetModel: Model<CharacterSheetDocument>
    ) {}

    /** Pega a cada personaje el resumen de su ficha. Una sola consulta para todos. */
    private async withSheets<T extends { _id: unknown }>(characters: T[]): Promise<(T & { sheet: SheetSummary | null })[]> {
        const sheets = await this.sheetModel
            .find({ characterId: { $in: characters.map((c) => c._id) } })
            .select({ characterId: 1, completed: 1, 'build.level': 1 })
            .lean()
            .exec();
        const byCharacter = new Map(sheets.map((s) => [String(s.characterId), s]));
        return characters.map((c) => {
            const s = byCharacter.get(String(c._id));
            return {
                ...c,
                sheet: s ? { _id: String(s._id), completed: !!s.completed, level: s.build?.level ?? null } : null,
            };
        });
    }

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
            return { ...player, characters: await this.withSheets(characters) };
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
        return { ...player, characters: await this.withSheets(characters) };
    }

    async update(id: string, data: Partial<Player>): Promise<Player> {
        return this.playerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.playerModel.findByIdAndDelete(id).exec();
    }
}
