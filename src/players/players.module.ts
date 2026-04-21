import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player, PlayerSchema } from '../schema/wiki/player.schema';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Player.name, schema: PlayerSchema },
            { name: Character.name, schema: CharacterSchema }
        ]),
        SharedModule
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
    exports: [PlayersService]
})
export class PlayersModule {}
