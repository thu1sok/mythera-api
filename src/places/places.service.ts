import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Place, PlaceDocument } from 'src/schema/places/places.schema';
import { UpdatePlaceCreaturesDto } from './dtos/update-place-creatures.dto';

const INITIAL_FIELDS = '_id id name description type x y imageUrl iconSize';

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
    return this.placeModel
      .find({}, INITIAL_FIELDS)
      .lean()
      .exec();  
  }

  async findOneDetails(id: string): Promise<Place> {
    const place = await this.placeModel
      .findOne({ id })
      .lean()
      .exec();

    if (!place) throw new NotFoundException('Place not found');
    
    return place;
  }

  async findOneDetailsById(_id: string): Promise<Place> {
    const place = await this.placeModel
      .findById(_id)
      .lean()
      .exec();

    if (!place) throw new NotFoundException('Place not found');
    
    return place;
  }

  async update(id: string, updatePlaceDto: Partial<Place>): Promise<Place> {
    return this.placeModel.findByIdAndUpdate(id, updatePlaceDto, {
      new: true,
    }).exec();
  }

  async updateImage(id: string, imageUrl: string): Promise<Place> {
    const place = await this.placeModel.findByIdAndUpdate(
      id,
      { imageUrl },
      { new: true },
    ).exec();

    if (!place) throw new NotFoundException('Place not found');
    return place;
  }

  async remove(id: string): Promise<Place> {
    return this.placeModel.findByIdAndDelete(id).exec();
  }

  async updateDescriptionHtml(_id: string, descriptionHtml: string) {
    const place = await this.placeModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          'details.descriptionHtml': descriptionHtml,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    return place;
  }

  async updateCreatures(_id: string, dto: UpdatePlaceCreaturesDto) {
    const update: Record<string, any> = {};

    if (dto.creatures !== undefined) {
      update['details.creatures'] = dto.creatures;
    }

    if (dto.legendaryCreatures !== undefined) {
      update['details.legendaryCreatures'] = dto.legendaryCreatures;
    }

    const place = await this.placeModel.findByIdAndUpdate(
      _id,
      { $set: update },
      { new: true },
    );

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    return place;
  }

  async addObject(placeId: string, dto: { name: string; description: string }) {
    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      { $push: { 'details.objects': dto } },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');
    
    const created = place.details?.objects?.[place.details.objects.length - 1];
    return created;
  }

  async updateObject(
    placeId: string,
    objectId: string,
    dto: { name: string; description: string },
  ) {
    if (!Types.ObjectId.isValid(objectId)) {
      throw new BadRequestException('Invalid object id');
    }

    const place = await this.placeModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(placeId),
        'details.objects._id': new Types.ObjectId(objectId),
      },
      {
        $set: {
          'details.objects.$.name': dto.name,
          'details.objects.$.description': dto.description,
        },
      },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place or object not found');

    const updated = place.details?.objects?.find(
      (o: any) => o._id.toString() === objectId,
    );
    return updated;
  }

  async deleteObjectById(placeId: string, objectId: string) {
    if (!Types.ObjectId.isValid(objectId)) {
      throw new BadRequestException('Invalid object id');
    }

    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      {
        $pull: {
          'details.objects': { _id: new Types.ObjectId(objectId) },
        },
      },
      { new: true },
    );

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    return { ok: true };
  }

  async addArmyUnit(placeId: string, dto: { name: string; description: string }) {
    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      { $push: { 'details.army': dto } },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');

    const created = place.details?.army?.[place.details.army.length - 1];
    return created;
  }

  async updateArmyUnit(
    placeId: string,
    armyItemId: string,
    dto: { name: string; description: string },
  ) {
    if (!Types.ObjectId.isValid(armyItemId)) {
      throw new BadRequestException('Invalid army item id');
    }

    const place = await this.placeModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(placeId),
        'details.army._id': new Types.ObjectId(armyItemId),
      },
      {
        $set: {
          'details.army.$.name': dto.name,
          'details.army.$.description': dto.description,
        },
      },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place or army unit not found');

    const updated = place.details?.army?.find(
      (a: any) => a._id.toString() === armyItemId,
    );
    return updated;
  }

  async deleteArmyUnit(placeId: string, armyItemId: string) {
    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      { $pull: { 'details.army': { _id: armyItemId } } },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }

  async addPlaceOfInterest(placeId: string, dto: { name: string; description: string }) {
    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      { $push: { 'details.placesOfInterest': dto } },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');

    const created = place.details?.placesOfInterest?.[place.details.placesOfInterest.length - 1];
    return created;
  }

  async updatePlaceOfInterest(
    placeId: string,
    placeOfInterestId: string,
    dto: { name: string; description: string },
  ) {
    if (!Types.ObjectId.isValid(placeOfInterestId)) {
      throw new BadRequestException('Invalid place of interest id');
    }

    const place = await this.placeModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(placeId),
        'details.placesOfInterest._id': new Types.ObjectId(placeOfInterestId),
      },
      {
        $set: {
          'details.placesOfInterest.$.name': dto.name,
          'details.placesOfInterest.$.description': dto.description,
        },
      },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place or place of interest not found');

    const updated = place.details?.placesOfInterest?.find(
      (p: any) => p._id.toString() === placeOfInterestId,
    );
    return updated;
  }

  async deletePlaceOfInterest(placeId: string, placeOfInterestId: string) {
    if (!Types.ObjectId.isValid(placeOfInterestId)) {
      throw new BadRequestException('Invalid place of interest id');
    }

    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      {
        $pull: {
          'details.placesOfInterest': { _id: new Types.ObjectId(placeOfInterestId) },
        },
      },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }

  async addNpc(placeId: string, dto: any) {
    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      { $push: { 'details.npcs': dto } },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');

    const created = place.details?.npcs?.[place.details.npcs.length - 1];
    return created;
  }

  async updateNpc(placeId: string, npcId: string, dto: any) {
    if (!Types.ObjectId.isValid(npcId)) {
      throw new BadRequestException('Invalid NPC id');
    }

    const updateFields: Record<string, any> = {};
    if (dto.name !== undefined) updateFields['details.npcs.$.name'] = dto.name;
    if (dto.title !== undefined) updateFields['details.npcs.$.title'] = dto.title;
    if (dto.image !== undefined) updateFields['details.npcs.$.image'] = dto.image;
    if (dto.descriptionHtml !== undefined) updateFields['details.npcs.$.descriptionHtml'] = dto.descriptionHtml;
    if (dto.personality !== undefined) updateFields['details.npcs.$.personality'] = dto.personality;

    const place = await this.placeModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(placeId),
        'details.npcs._id': new Types.ObjectId(npcId),
      },
      { $set: updateFields },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place or NPC not found');

    const updated = place.details?.npcs?.find(
      (n: any) => n._id.toString() === npcId,
    );
    return updated;
  }

  async deleteNpc(placeId: string, npcId: string) {
    if (!Types.ObjectId.isValid(npcId)) {
      throw new BadRequestException('Invalid NPC id');
    }

    const place = await this.placeModel.findByIdAndUpdate(
      placeId,
      {
        $pull: {
          'details.npcs': { _id: new Types.ObjectId(npcId) },
        },
      },
      { new: true },
    );

    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }
}

