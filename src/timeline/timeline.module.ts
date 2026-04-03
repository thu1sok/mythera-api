import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { TimelineEra, TimelineEraSchema } from '../schema/timeline/timeline-era.schema';
import { TimelineEvent, TimelineEventSchema } from '../schema/timeline/timeline-event.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TimelineEra.name, schema: TimelineEraSchema },
            { name: TimelineEvent.name, schema: TimelineEventSchema },
        ]),
    ],
    controllers: [TimelineController],
    providers: [TimelineService],
})
export class TimelineModule { }
