import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CharacterSheet,
  CharacterSheetDocument,
} from '../schema/wiki/character-sheet.schema';
import {
  Character,
  CharacterDocument,
} from '../schema/wiki/character.schema';

@Injectable()
export class CharacterSheetsService {
  constructor(
    @InjectModel(CharacterSheet.name)
    private readonly sheetModel: Model<CharacterSheetDocument>,
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async findAll(): Promise<CharacterSheet[]> {
    return this.sheetModel.find().sort({ createdAt: 1 }).exec();
  }

  async findOne(id: string): Promise<CharacterSheet> {
    // Un id mal formado haria saltar un CastError (500): para el cliente es
    // lo mismo que una ficha que no existe.
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Ficha no encontrada');
    }
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
    if (!Types.ObjectId.isValid(playerId)) return [];
    // El jugador es el del personaje: la ficha no lo guarda.
    const characterIds = await this.characterModel
      .find({ playerId })
      .distinct('_id')
      .exec();
    return this.sheetModel
      .find({ characterId: { $in: characterIds } })
      .sort({ createdAt: 1 })
      .exec();
  }

  /** La ficha de un personaje: como mucho hay una (indice unico). */
  async findByCharacter(characterId: string): Promise<CharacterSheet> {
    const sheet = Types.ObjectId.isValid(characterId)
      ? await this.sheetModel.findOne({ characterId }).exec()
      : null;
    if (!sheet) {
      throw new NotFoundException('Ese personaje no tiene ficha');
    }
    return sheet;
  }

  /**
   * Crea la ficha de un personaje que ya existe. Puede nacer incompleta
   * (sin build, completed false): el creador la va rellenando por pasos.
   */
  async create(dto: Partial<CharacterSheet>): Promise<CharacterSheet> {
    const characterId = dto.characterId?.toString();
    if (!characterId || !Types.ObjectId.isValid(characterId)) {
      throw new BadRequestException('Falta characterId');
    }
    if (!(await this.characterModel.exists({ _id: characterId }))) {
      throw new NotFoundException('Personaje no encontrado');
    }
    if (await this.sheetModel.exists({ characterId })) {
      throw new ConflictException('Ese personaje ya tiene ficha');
    }
    const created = new this.sheetModel({ ...dto, characterId });
    return created.save();
  }

  /**
   * Lo que usa la ficha de mesa: el estado y el equipo. Y 'completed', que
   * lo pone el creador al terminar.
   *
   * 'build' NO se toca por aqui, para que un boton de puntos de golpe no
   * pueda corromper la construccion del personaje; para eso esta
   * updateBuild. 'characterId' tampoco. La identidad (nombre,
   * retrato...) ya no esta en la ficha: se edita en el personaje.
   */
  private static readonly CAMPOS_EDITABLES = [
    'state',
    'equipment',
    'currency',
    'overrides',
    'notes',
    'completed',
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

  /**
   * La unica via por la que cambia 'build': los pasos del creador y subir de
   * nivel. Mientras completed sea false, build puede venir parcial.
   */
  async updateBuild(
    id: string,
    dto: Partial<CharacterSheet>,
  ): Promise<CharacterSheet> {
    await this.findOne(id);
    if (!dto.build) {
      throw new BadRequestException('Falta el bloque build');
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
