import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WikiHome, WikiHomeDocument } from '../schema/wiki/wiki-home.schema';

@Injectable()
export class WikiHomeService {
  constructor(
    @InjectModel(WikiHome.name) private wikiHomeModel: Model<WikiHomeDocument>,
  ) {}

  async getConfig(): Promise<WikiHome> {
    const config = await this.wikiHomeModel.findOne().exec();
    if (!config) {
      return { pinnedSessions: [] };
    }
    return config;
  }

  async updateConfig(pinnedSessions: any[]): Promise<WikiHome> {
    let config = await this.wikiHomeModel.findOne().exec();
    if (!config) {
      config = new this.wikiHomeModel({ pinnedSessions });
    } else {
      config.pinnedSessions = pinnedSessions;
    }
    return config.save();
  }
}
