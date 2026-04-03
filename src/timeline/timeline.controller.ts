import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
    constructor(private readonly timelineService: TimelineService) { }

    // Eras
    @Post('eras')
    async createEra(@Body() data: any) {
        const era = await this.timelineService.createEra(data);
        return { message: 'Era created successfully', era };
    }

    @Get('eras')
    async findAllEras() {
        return this.timelineService.findAllEras();
    }

    @Patch('eras/:id')
    async updateEra(@Param('id') id: string, @Body() data: any) {
        const era = await this.timelineService.updateEra(id, data);
        return { message: 'Era updated successfully', era };
    }

    @Delete('eras/:id')
    async deleteEra(@Param('id') id: string) {
        await this.timelineService.deleteEra(id);
        return { message: 'Era deleted successfully' };
    }

    // Events
    @Post('events')
    async createEvent(@Body() data: any) {
        const event = await this.timelineService.createEvent(data);
        return { message: 'Event created successfully', event };
    }

    @Get('events')
    async findAllEvents() {
        return this.timelineService.findAllEvents();
    }

    @Patch('events/:id')
    async updateEvent(@Param('id') id: string, @Body() data: any) {
        const event = await this.timelineService.updateEvent(id, data);
        return { message: 'Event updated successfully', event };
    }

    @Delete('events/:id')
    async deleteEvent(@Param('id') id: string) {
        await this.timelineService.deleteEvent(id);
        return { message: 'Event deleted successfully' };
    }
}
