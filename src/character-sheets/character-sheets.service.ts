import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CharacterSheet,
  CharacterSheetDocument,
} from '../schema/wiki/character-sheet.schema';

@Injectable()
export class CharacterSheetsService {
  constructor(
    @InjectModel(CharacterSheet.name)
    private readonly sheetModel: Model<CharacterSheetDocument>,
  ) {}

  async findAll(): Promise<CharacterSheet[]> {
    return this.sheetModel.find().sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<CharacterSheet> {
    const sheet = await this.sheetModel.findById(id).exec();
    if (!sheet) {
      throw new NotFoundException('Ficha no encontrada');
    }
    return sheet;
  }

  /**
   * Todas las fichas de un jugador. Un jugador puede tener tantas como
   * quiera; devolver lista vacia es una respuesta valida, no un 404.
   */
  async findByPlayer(playerId: string): Promise<CharacterSheet[]> {
    return this.sheetModel.find({ playerId }).sort({ name: 1 }).exec();
  }

  /** Lo que manda el creador al terminar. */
  async create(dto: Partial<CharacterSheet>): Promise<CharacterSheet> {
    const created = new this.sheetModel(dto);
    return created.save();
  }

  /**
   * Lo que usa la ficha de mesa: el estado, el equipo y la identidad.
   *
   * 'build' NO se toca por aqui, para que un boton de puntos de golpe no
   * pueda corromper la construccion del personaje; para eso esta
   * updateBuild. Y 'playerId' tampoco, porque una ficha no cambia de dueno.
   */
  private static readonly CAMPOS_EDITABLES = [
    'state',
    'equipment',
    'currency',
    'overrides',
    'notes',
    'name',
    'age',
    'gender',
    'portraitUrl',
    'description',
  ] as const;

  async updateState(
    id: string,
    dto: Partial<CharacterSheet>,
  ): Promise<CharacterSheet> {
    await this.findOne(id);
    const cambios: Record<string, unknown> = {};
    for (const campo of CharacterSheetsService.CAMPOS_EDITABLES) {
      const valor = (dto as Record<string, unknown>)[campo];
      if (valor !== undefined) cambios[campo] = valor;
    }

    return this.sheetModel
      .findByIdAndUpdate(id, { $set: cambios }, { new: true })
      .exec();
  }

  /** Subir de nivel: la unica via por la que cambia 'build'. */
  async updateBuild(
    id: string,
    dto: Partial<CharacterSheet>,
  ): Promise<CharacterSheet> {
    await this.findOne(id);
    if (!dto.build) {
      throw new NotFoundException('Falta el bloque build');
    }
    return this.sheetModel
      .findByIdAndUpdate(id, { $set: { build: dto.build } }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.sheetModel.findByIdAndDelete(id).exec();
  }
}
