import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NarrativeArcsController } from './narrative-arcs.controller';
import { NarrativeArcsService } from './narrative-arcs.service';
import { NarrativeArc, NarrativeArcSchema } from '../schema/narrative-arcs/narrative-arc.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NarrativeArc.name, schema: NarrativeArcSchema },
    ]),
  ],
  controllers: [NarrativeArcsController],
  providers: [NarrativeArcsService, CloudinaryService],
})
export class NarrativeArcsModule {}
