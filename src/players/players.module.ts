import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player, PlayerSchema } from '../schema/wiki/player.schema';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { CharacterSheet, CharacterSheetSchema } from '../schema/wiki/character-sheet.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Player.name, schema: PlayerSchema },
            { name: Character.name, schema: CharacterSchema },
            { name: CharacterSheet.name, schema: CharacterSheetSchema }
        ]),
        SharedModule
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
    exports: [PlayersService]
})
export class PlayersModule {}
