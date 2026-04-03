import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rule, RuleDocument } from '../schema/wiki/rule.schema';

@Injectable()
export class RulesService {
    constructor(@InjectModel(Rule.name) private model: Model<RuleDocument>) {}

    async findAll(): Promise<Rule[]> {
        return this.model.find().exec();
    }

    async findOne(id: string): Promise<Rule> {
        return this.model.findById(id).exec();
    }

    async create(createDto: Partial<Rule>): Promise<Rule> {
        const created = new this.model(createDto);
        return created.save();
    }

    async update(id: string, updateDto: Partial<Rule>): Promise<Rule> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
