import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactionsService } from './factions.service';
import { FactionsController } from './factions.controller';
import { Faction, FactionSchema } from '../schema/wiki/faction.schema';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Faction.name, schema: FactionSchema },
            { name: Character.name, schema: CharacterSchema }
        ]),
        SharedModule
    ],
    controllers: [FactionsController],
    providers: [FactionsService],
    exports: [FactionsService]
})
export class FactionsModule {}
