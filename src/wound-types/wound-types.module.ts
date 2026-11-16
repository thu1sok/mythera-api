import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WoundType, WoundTypeSchema } from '../schema/wiki/wound-type.schema';
import { WoundTypesController } from './wound-types.controller';
import { WoundTypesService } from './wound-types.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: WoundType.name, schema: WoundTypeSchema }])],
  controllers: [WoundTypesController],
  providers: [WoundTypesService],
})
export class WoundTypesModule {}
