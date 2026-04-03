import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
        SharedModule
    ],
    controllers: [CharactersController],
    providers: [CharactersService],
})
export class CharactersModule {}
