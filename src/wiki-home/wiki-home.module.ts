import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WikiHomeController } from './wiki-home.controller';
import { WikiHomeService } from './wiki-home.service';
import { WikiHome, WikiHomeSchema } from '../schema/wiki/wiki-home.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WikiHome.name, schema: WikiHomeSchema }]),
  ],
  controllers: [WikiHomeController],
  providers: [WikiHomeService],
  exports: [WikiHomeService],
})
export class WikiHomeModule {}
