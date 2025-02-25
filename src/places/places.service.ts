import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from 'src/schema/places/places.schema';


@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async create(createPlaceDto: Partial<Place>): Promise<Place> {
    const newPlace = new this.placeModel(createPlaceDto);
    return newPlace.save();
  }

  async findAll(): Promise<Place[]> {
    return this.placeModel.find().exec();
  }

  async findOne(id: string): Promise<Place> {
    return this.placeModel.findById(id).exec();
  }

  async update(id: string, updatePlaceDto: Partial<Place>): Promise<Place> {
    return this.placeModel.findByIdAndUpdate(id, updatePlaceDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<Place> {
    return this.placeModel.findByIdAndDelete(id).exec();
  }
}
