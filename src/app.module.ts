import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './places/places.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './shared/services/cloudinary.service';
import { SharedModule } from './shared/shared.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot(),
    PlacesModule
  ],
  exports: [
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
