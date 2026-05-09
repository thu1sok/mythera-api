import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Place, PlaceDocument } from 'src/schema/places/places.schema';
import { Npc, NpcDocument } from '../schema/wiki/npc.schema';
import { RegionDocument } from 'src/schema/regions/regions.schema';

const INITIAL_FIELDS = '_id id name description type x y imageUrl iconSize';

export class PlacesService implements OnModuleInit {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
    @InjectModel(Npc.name) private npcModel: Model<NpcDocument>,
    @InjectModel('Region') private regionModel: Model<RegionDocument>,
  ) { }

  private async getModelForId(id: string): Promise<Model<any>> {
    if (await this.placeModel.exists({ _id: id })) return this.placeModel;
    if (await this.regionModel.exists({ _id: id })) return this.regionModel;
    throw new NotFoundException('Place or Region not found');
  }

  async onModuleInit() {
    try {
      // Find places where npcs is an array
      const placesWithEmbeddedNpcs = await this.placeModel.find({
        'details.npcs': { $exists: true, $not: { $size: 0 } }
      }).exec();

      let migratedCount = 0;
      for (const place of placesWithEmbeddedNpcs) {
        if (place.details && place.details.npcs && place.details.npcs.length > 0) {
          const npcsToMigrate = place.details.npcs.filter((npc: any) => npc && (npc.name || typeof npc.id === 'string'));

          if (npcsToMigrate.length > 0) {
            const newNpcIds = [];

            for (const rawNpc of place.details.npcs) {
              const npcData: any = rawNpc;
              if (npcData && (npcData.name || typeof npcData.id === 'string')) {
                const newNpc = new this.npcModel({
                  name: npcData.name,
                  title: npcData.title,
                  imageUrl: npcData.image, // Map old 'image' to 'imageUrl'
                  descriptionHtml: npcData.descriptionHtml,
                  personality: npcData.personality,
                  placeId: place._id
                });
                const savedNpc = await newNpc.save();
                newNpcIds.push(savedNpc._id);
                migratedCount++;
              } else if (Types.ObjectId.isValid(npcData as any)) {
                newNpcIds.push(npcData);
              } else if (npcData && npcData._id) {
                newNpcIds.push(npcData._id);
              }
            }

            await this.placeModel.findByIdAndUpdate(place._id, {
              $set: { 'details.npcs': newNpcIds }
            });
          }
        }
      }
      if (migratedCount > 0) {
        console.log(`Successfully migrated ${migratedCount} embedded NPCs to standalone collection.`);
      }

      // --- MIGRATION: Creatures & Legendary Creatures from string to NamedDescription[] ---
      const placesToMigrateFauna = await this.placeModel.find({
        $or: [
          { 'details.creatures': { $type: 'string' } },
          { 'details.legendaryCreatures': { $type: 'string' } },
          { 'details.updates': { $type: 'string' } }
        ]
      }).lean().exec();

      let faunaMigratedCount = 0;
      for (const place of placesToMigrateFauna) {
        const update: any = { $set: {} };
        const details: any = place.details;

        if (typeof details?.creatures === 'string') {
          const val = details.creatures.trim();
          update.$set['details.creatures'] = val ? [{ name: 'Fauna Registrada', description: val }] : [];
        }

        if (typeof details?.legendaryCreatures === 'string') {
          const val = details.legendaryCreatures.trim();
          update.$set['details.legendaryCreatures'] = val ? [{ name: 'Amenaza Legendaria Registrada', description: val }] : [];
        }
        
        if (typeof details?.updates === 'string') {
          const val = details.updates.trim();
          update.$set['details.updates'] = val ? [{ name: 'Registro Antiguo', description: val }] : [];
        }

        if (Object.keys(update.$set).length > 0) {
          await this.placeModel.updateOne({ _id: place._id }, update);
          faunaMigratedCount++;
        }
      }
      if (faunaMigratedCount > 0) {
        console.log(`Successfully migrated strings data for ${faunaMigratedCount} places.`);
      }

    } catch (e) {
      console.error('Error during migration', e);
    }
  }

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
      .populate('details.npcs')
      .lean()
      .exec();

    if (!place) throw new NotFoundException('Place not found');

    return place;
  }

  async findOneDetailsById(_id: string): Promise<any> {
    const place = await this.placeModel
      .findById(_id)
      .populate('details.npcs')
      .lean()
      .exec();

    if (place) return place;

    const region = await this.regionModel
      .findById(_id)
      .lean()
      .exec();
      
    if (region) return region;

    throw new NotFoundException('Place/Region not found');
  }

  async update(id: string, updatePlaceDto: Partial<Place>): Promise<any> {
    const model = await this.getModelForId(id);
    return model.findByIdAndUpdate(id, updatePlaceDto, {
      new: true,
    }).exec();
  }

  async updateDescriptionHtml(id: string, descriptionHtml: string) {
    const model = await this.getModelForId(id);
    const place = await model.findByIdAndUpdate(
      id,
      { $set: { 'details.descriptionHtml': descriptionHtml } },
      { new: true }
    );
    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }

  async updateImage(id: string, imageUrl: string) {
    const model = await this.getModelForId(id);
    const place = await model.findByIdAndUpdate(
      id,
      { $set: { 'imageUrl': imageUrl } },
      { new: true }
    );
    if (!place) throw new NotFoundException('Place not found');
    return place;
  }

  async remove(id: string): Promise<Place> {
    return this.placeModel.findByIdAndDelete(id).exec();
  }

  // --- GENERIC SUB-ITEM HANDLERS ---

  async addSubItem(placeId: string, category: string, dto: { name?: string; description?: string; imageUrl?: string }) {
    const model = await this.getModelForId(placeId);
    const update: any = { $push: {} };
    update.$push[`details.${category}`] = {
      $each: [dto],
      $position: 0
    };
    const place = await model.findByIdAndUpdate(placeId, update, { new: true });
    if (!place) throw new NotFoundException('Place not found');
    const list = (place.details as any)[category];
    return list[list.length - 1];
  }

  async updateSubItem(placeId: string, category: string, itemId: string, dto: { name?: string; description?: string; imageUrl?: string }) {
    if (!Types.ObjectId.isValid(itemId)) {
      throw new BadRequestException('Invalid item id');
    }
    const model = await this.getModelForId(placeId);
    const query: any = { _id: new Types.ObjectId(placeId) };
    query[`details.${category}._id`] = new Types.ObjectId(itemId);

    const update: any = { $set: {} };
    if (dto.name !== undefined) update.$set[`details.${category}.$.name`] = dto.name;
    if (dto.description !== undefined) update.$set[`details.${category}.$.description`] = dto.description;
    if (dto.imageUrl !== undefined) update.$set[`details.${category}.$.imageUrl`] = dto.imageUrl;

    const place = await model.findOneAndUpdate(query, update, { new: true });
    if (!place) throw new NotFoundException('Place or item not found');
    return ((place.details as any)[category] as any[]).find((i: any) => i._id.toString() === itemId);
  }

  async deleteSubItem(placeId: string, category: string, itemId: string) {
    if (!Types.ObjectId.isValid(itemId)) {
      throw new BadRequestException('Invalid item id');
    }
    const model = await this.getModelForId(placeId);
    const update: any = { $pull: {} };
    update.$pull[`details.${category}`] = { _id: new Types.ObjectId(itemId) };
    const place = await model.findByIdAndUpdate(placeId, update, { new: true });
    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }

  async addNpc(placeId: string, dto: any) {
    const npc = new this.npcModel({ ...dto, placeId: new Types.ObjectId(placeId) });
    const created = await npc.save();

    const model = await this.getModelForId(placeId);
    const place = await model.findByIdAndUpdate(
      placeId,
      { $push: { 'details.npcs': created._id } },
      { new: true },
    ).populate('details.npcs');

    if (!place) throw new NotFoundException('Place not found');

    const populatedNpcs: any[] = place.details?.npcs || [];
    return populatedNpcs.find((n: any) => n._id.toString() === created._id.toString());
  }

  async updateNpc(placeId: string, npcId: string, dto: any) {
    if (!Types.ObjectId.isValid(npcId)) throw new BadRequestException('Invalid npc id');
    
    const updated = await this.npcModel.findByIdAndUpdate(
      npcId,
      { $set: dto },
      { new: true }
    );
    if (!updated) throw new NotFoundException('NPC not found');

    const model = await this.getModelForId(placeId);
    const place = await model.findById(placeId).populate('details.npcs');
    const populatedNpcs: any[] = place?.details?.npcs || [];
    return populatedNpcs.find((n: any) => n._id.toString() === npcId);
  }

  async deleteNpc(placeId: string, npcId: string) {
    if (!Types.ObjectId.isValid(npcId)) throw new BadRequestException('Invalid npc id');

    await this.npcModel.findByIdAndDelete(npcId);

    const model = await this.getModelForId(placeId);
    const place = await model.findByIdAndUpdate(
      placeId,
      { $pull: { 'details.npcs': new Types.ObjectId(npcId) } },
      { new: true }
    );

    if (!place) throw new NotFoundException('Place not found');
    return { ok: true };
  }
}
