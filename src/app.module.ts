import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './places/places.module';
import { NarrativeArcsModule } from './narrative-arcs/narrative-arcs.module';
import { TimelineModule } from './timeline/timeline.module';
import { GodsModule } from './gods/gods.module';
import { EternalsModule } from './eternals/eternals.module';
import { RacesModule } from './races/races.module';
import { SubracesModule } from './subraces/subraces.module';
import { CharactersModule } from './characters/characters.module';
import { NpcsModule } from './npcs/npcs.module';
import { FactionsModule } from './factions/factions.module';
import { RulesModule } from './rules/rules.module';
import { HistoricalEventsModule } from './historical-events/historical-events.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot(),
    PlacesModule,
    NarrativeArcsModule,
    TimelineModule,
    GodsModule,
    EternalsModule,
    RacesModule,
    SubracesModule,
    CharactersModule,
    NpcsModule,
    FactionsModule,
    RulesModule,
    HistoricalEventsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule { }
