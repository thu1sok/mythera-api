import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from 'src/schema/regions/regions.schema';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>,
  ) {}

  async create(dto: CreateRegionDto, imageUrl?: string): Promise<Region> {
    const region = new this.regionModel({ ...dto, imageUrl });
    return region.save();
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Region> {
    const region = await this.regionModel.findById(id).lean().exec();
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  async update(id: string, dto: Partial<CreateRegionDto>, imageUrl?: string): Promise<Region> {
    const payload: any = { ...dto };
    if (imageUrl !== undefined) payload.imageUrl = imageUrl;
    const region = await this.regionModel.findByIdAndUpdate(id, payload, { new: true }).lean().exec();
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  async remove(id: string): Promise<void> {
    const result = await this.regionModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Region not found');
  }
}
