import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { Faction, FactionSchema } from '../schema/wiki/faction.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Character.name, schema: CharacterSchema },
            { name: Faction.name, schema: FactionSchema }
        ]),
        SharedModule
    ],
    controllers: [CharactersController],
    providers: [CharactersService],
})
export class CharactersModule {}
