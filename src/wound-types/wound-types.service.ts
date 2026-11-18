import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WoundType, WoundTypeDocument } from '../schema/wiki/wound-type.schema';
import { validateWoundType } from './wound-type.validation';

/** Escapa un texto para usarlo literal en una expresion regular. */
const literal = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

@Injectable()
export class WoundTypesService {
  constructor(@InjectModel(WoundType.name) private readonly model: Model<WoundTypeDocument>) {}

  findAll() {
    return this.model.find().sort({ name: 1 }).collation({ locale: 'es' }).exec();
  }

  /** Sin nombres repetidos (sin mirar mayusculas): que no haya dos «Ciego». */
  async create(raw: unknown) {
    const input = validateWoundType(raw);
    if (typeof input === 'string') throw new BadRequestException(input);
    const exists = await this.model.exists({ name: { $regex: `^${literal(input.name)}$`, $options: 'i' } });
    if (exists) throw new ConflictException(`Ya hay un tipo de herida que se llama «${input.name}».`);
    return this.model.create(input);
  }

  /** Borrarlo no toca ninguna ficha: las que lo tenian lo llevan copiado. */
  async remove(id: string) {
    const gone = await this.model.findByIdAndDelete(id).exec();
    if (!gone) throw new NotFoundException('Ese tipo de herida no existe.');
    return gone;
  }
}
