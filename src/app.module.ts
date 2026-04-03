import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
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

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
    AuthModule,
    UsersModule,
  ],
  exports: [],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
