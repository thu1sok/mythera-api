import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { Rule, RuleSchema } from '../schema/wiki/rule.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
        SharedModule
    ],
    controllers: [RulesController],
    providers: [RulesService]
})
export class RulesModule {}
