import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DurmienteRegion, DurmienteRegionDocument } from '../schema/regions/durmiente-regions.schema';
import { CreateRegionDto } from '../regions/dto/create-region.dto';

@Injectable()
export class DurmienteRegionsService {
  constructor(
    @InjectModel(DurmienteRegion.name) private durmienteRegionModel: Model<DurmienteRegionDocument>,
  ) {}

  async create(dto: CreateRegionDto, imageUrl?: string): Promise<DurmienteRegion> {
    const region = new this.durmienteRegionModel({ ...dto, imageUrl });
    return region.save();
  }

  async findAll(): Promise<DurmienteRegion[]> {
    return this.durmienteRegionModel.find().lean().exec();
  }

  async findOne(id: string): Promise<DurmienteRegion> {
    const region = await this.durmienteRegionModel.findById(id).lean().exec();
    if (!region) throw new NotFoundException('Durmiente Region not found');
    return region;
  }

  async update(id: string, dto: Partial<CreateRegionDto>, imageUrl?: string): Promise<DurmienteRegion> {
    const payload: any = { ...dto };
    if (imageUrl !== undefined) payload.imageUrl = imageUrl;
    const region = await this.durmienteRegionModel.findByIdAndUpdate(id, payload, { new: true }).lean().exec();
    if (!region) throw new NotFoundException('Durmiente Region not found');
    return region;
  }

  async remove(id: string): Promise<void> {
    const result = await this.durmienteRegionModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Durmiente Region not found');
  }
}
