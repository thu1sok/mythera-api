import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DurmientePlace, DurmientePlaceDocument } from '../schema/places/durmiente-places.schema';
import { DurmienteRegion, DurmienteRegionDocument } from '../schema/regions/durmiente-regions.schema';

const INITIAL_FIELDS = '_id id name description type x y imageUrl iconSize';

@Injectable()
export class DurmientePlacesService {
  constructor(
    @InjectModel(DurmientePlace.name) private durmientePlaceModel: Model<DurmientePlaceDocument>,
    @InjectModel(DurmienteRegion.name) private durmienteRegionModel: Model<DurmienteRegionDocument>,
  ) {}

  private async getModelForId(id: string): Promise<Model<any>> {
    if (await this.durmientePlaceModel.exists({ _id: id })) return this.durmientePlaceModel;
    if (await this.durmienteRegionModel.exists({ _id: id })) return this.durmienteRegionModel;
    throw new NotFoundException('Durmiente Place or Region not found');
  }

  async create(createDto: Partial<DurmientePlace>): Promise<DurmientePlace> {
    const newPlace = new this.durmientePlaceModel(createDto);
    return newPlace.save();
  }

  async findAll(): Promise<DurmientePlace[]> {
    return this.durmientePlaceModel
      .find({}, INITIAL_FIELDS)
      .lean()
      .exec();
  }

  async findOneDetailsById(_id: string): Promise<any> {
    const place = await this.durmientePlaceModel
      .findById(_id)
      .populate('details.npcs')
      .lean()
      .exec();

    if (place) return place;

    const region = await this.durmienteRegionModel
      .findById(_id)
      .lean()
      .exec();

    if (region) return region;

    throw new NotFoundException('Durmiente Place/Region not found');
  }

  async update(id: string, updateDto: Partial<DurmientePlace>): Promise<any> {
    const model = await this.getModelForId(id);
    const updated = await model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Durmiente Place/Region not found');
    return updated;
  }

  async updateDescriptionHtml(id: string, descriptionHtml: string): Promise<any> {
    const model = await this.getModelForId(id);
    const place = await model.findByIdAndUpdate(
      id,
      { $set: { 'details.descriptionHtml': descriptionHtml } },
      { new: true }
    );
    if (!place) throw new NotFoundException('Durmiente Place not found');
    return { ok: true };
  }

  async updateImage(id: string, imageUrl: string): Promise<any> {
    const model = await this.getModelForId(id);
    const place = await model.findByIdAndUpdate(
      id,
      { $set: { imageUrl } },
      { new: true }
    );
    if (!place) throw new NotFoundException('Durmiente Place not found');
    return place;
  }

  async addSubItem(id: string, category: string, subItem: any): Promise<any> {
    const model = await this.getModelForId(id);
    const place = await model.findById(id);
    if (!place) throw new NotFoundException('Durmiente Place not found');

    if (!place.details) {
      place.details = {} as any;
    }
    if (!place.details[category]) {
      place.details[category] = [];
    }

    place.details[category].push(subItem);
    await place.save();
    return { ok: true, place };
  }

  async remove(id: string): Promise<void> {
    const result = await this.durmientePlaceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Durmiente Place not found');
  }
}
