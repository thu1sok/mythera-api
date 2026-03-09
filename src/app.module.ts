import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './places/places.module';
import { NarrativeArcsModule } from './narrative-arcs/narrative-arcs.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot(),
    PlacesModule,
    NarrativeArcsModule,
  ],
  exports: [
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
