import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NarrativeArcsController } from './narrative-arcs.controller';
import { NarrativeArcsService } from './narrative-arcs.service';
import { NarrativeArc, NarrativeArcSchema } from '../schema/narrative-arcs/narrative-arc.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NarrativeArc.name, schema: NarrativeArcSchema },
    ]),
    SharedModule,
  ],
  controllers: [NarrativeArcsController],
  providers: [NarrativeArcsService],
})
export class NarrativeArcsModule {}
