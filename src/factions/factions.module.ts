import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactionsService } from './factions.service';
import { FactionsController } from './factions.controller';
import { Faction, FactionSchema } from '../schema/wiki/faction.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Faction.name, schema: FactionSchema }]),
        SharedModule
    ],
    controllers: [FactionsController],
    providers: [FactionsService],
    exports: [FactionsService]
})
export class FactionsModule {}
