import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NpcsService } from './npcs.service';
import { NpcsController } from './npcs.controller';
import { Npc, NpcSchema } from '../schema/wiki/npc.schema';
import { Place, PlaceSchema } from '../schema/places/places.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Npc.name, schema: NpcSchema },
            { name: Place.name, schema: PlaceSchema }
        ]),
        SharedModule
    ],
    controllers: [NpcsController],
    providers: [NpcsService],
    exports: [NpcsService]
})
export class NpcsModule {}
