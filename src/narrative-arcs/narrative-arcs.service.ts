import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NarrativeArc, NarrativeArcDocument } from '../schema/narrative-arcs/narrative-arc.schema';

@Injectable()
export class NarrativeArcsService {
  constructor(
    @InjectModel(NarrativeArc.name)
    private narrativeArcModel: Model<NarrativeArcDocument>,
  ) {}

  async create(data: Partial<NarrativeArc>): Promise<NarrativeArc> {
    const newArc = new this.narrativeArcModel(data);
    return newArc.save();
  }

  async findAll(): Promise<NarrativeArc[]> {
    return this.narrativeArcModel.find()
      .populate('sessions.relatedPlaces', '_id name')
      .populate('sessions.players.characterId', '_id characterName playerName imageUrl')
      .lean()
      .exec();
  }

  async findById(id: string): Promise<NarrativeArc> {
    const arc = await this.narrativeArcModel
      .findById(id)
      .populate('sessions.relatedPlaces', '_id name')
      .populate('sessions.players.characterId', '_id characterName playerName imageUrl')
      .lean()
      .exec();
    if (!arc) {
      throw new NotFoundException('Narrative arc not found');
    }
    return arc;
  }

  async update(id: string, data: Partial<NarrativeArc>): Promise<NarrativeArc> {
    const arc = await this.narrativeArcModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!arc) {
      throw new NotFoundException('Narrative arc not found');
    }
    return arc;
  }

  async delete(id: string): Promise<void> {
    const result = await this.narrativeArcModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Narrative arc not found');
    }
  }

  // Session methods
  async addSession(arcId: string, sessionData: any): Promise<any> {
    const arc = await this.narrativeArcModel.findByIdAndUpdate(
      arcId,
      { $push: { sessions: sessionData } },
      { new: true },
    );
    if (!arc) {
      throw new NotFoundException('Narrative arc not found');
    }
    const created = arc.sessions[arc.sessions.length - 1];
    return created;
  }

  async updateSession(
    arcId: string,
    sessionId: string,
    sessionData: any,
  ): Promise<any> {
    if (!Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestException('Invalid session id');
    }

    const updateFields: Record<string, any> = {};
    if (sessionData.title !== undefined)
      updateFields['sessions.$.title'] = sessionData.title;
    if (sessionData.type !== undefined)
      updateFields['sessions.$.type'] = sessionData.type;
    if (sessionData.startLevel !== undefined)
      updateFields['sessions.$.startLevel'] = sessionData.startLevel;
    if (sessionData.players !== undefined)
      updateFields['sessions.$.players'] = sessionData.players;
    if (sessionData.contents !== undefined)
      updateFields['sessions.$.contents'] = sessionData.contents;
    if (sessionData.relatedPlaces !== undefined)
      updateFields['sessions.$.relatedPlaces'] = sessionData.relatedPlaces;
    if (sessionData.imageUrl !== undefined)
      updateFields['sessions.$.imageUrl'] = sessionData.imageUrl;

    const arc = await this.narrativeArcModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(arcId),
        'sessions._id': new Types.ObjectId(sessionId),
      },
      { $set: updateFields },
      { new: true },
    );

    if (!arc) {
      throw new NotFoundException('Narrative arc or session not found');
    }

    const updated = arc.sessions.find(
      (s: any) => s._id.toString() === sessionId,
    );
    return updated;
  }

  async deleteSession(arcId: string, sessionId: string): Promise<void> {
    if (!Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestException('Invalid session id');
    }

    const arc = await this.narrativeArcModel.findByIdAndUpdate(
      arcId,
      {
        $pull: {
          sessions: { _id: new Types.ObjectId(sessionId) },
        },
      },
      { new: true },
    );

    if (!arc) {
      throw new NotFoundException('Narrative arc not found');
    }
  }
}
