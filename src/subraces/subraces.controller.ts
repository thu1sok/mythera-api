import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubracesService } from './subraces.service';
import { Subrace } from '../schema/wiki/subrace.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('subraces')
export class SubracesController {
    constructor(
        private readonly subracesService: SubracesService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get()
    async findAll() {
        return this.subracesService.findAll();
    }

    @Get('by-race/:raceId')
    async findByRace(@Param('raceId') raceId: string) {
        return this.subracesService.findByRace(raceId);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Subrace>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        // Parse stats
        if (typeof payload.stats === 'string') {
            try {
                payload.stats = JSON.parse(payload.stats);
            } catch (e) { }
        }

        // Parse traits
        if (typeof payload.passiveTraits === 'string') {
            try { payload.passiveTraits = JSON.parse(payload.passiveTraits); } catch (e) { payload.passiveTraits = []; }
        }
        if (typeof payload.activeTraits === 'string') {
            try { payload.activeTraits = JSON.parse(payload.activeTraits); } catch (e) { payload.activeTraits = []; }
        }

        return this.subracesService.create(payload);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Subrace>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        // Parse stats
        if (typeof payload.stats === 'string') {
            try {
                payload.stats = JSON.parse(payload.stats);
            } catch (e) { }
        }

        // Parse traits
        if (typeof payload.passiveTraits === 'string') {
            try { payload.passiveTraits = JSON.parse(payload.passiveTraits); } catch (e) { }
        }
        if (typeof payload.activeTraits === 'string') {
            try { payload.activeTraits = JSON.parse(payload.activeTraits); } catch (e) { }
        }

        return this.subracesService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.subracesService.remove(id);
    }
}
