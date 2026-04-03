import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoricalEventsService } from './historical-events.service';
import { HistoricalEventsController } from './historical-events.controller';
import { HistoricalEvent, HistoricalEventSchema } from '../schema/wiki/historical-event.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: HistoricalEvent.name, schema: HistoricalEventSchema }]),
        SharedModule
    ],
    controllers: [HistoricalEventsController],
    providers: [HistoricalEventsService]
})
export class HistoricalEventsModule {}
