import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { Race, RaceSchema } from '../schema/wiki/race.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }]),
        SharedModule
    ],
    controllers: [RacesController],
    providers: [RacesService],
    exports: [RacesService]
})
export class RacesModule { }
