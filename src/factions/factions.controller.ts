import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FactionsService } from './factions.service';
import { Faction } from '../schema/wiki/faction.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('factions')
export class FactionsController {
    constructor(
        private readonly factionsService: FactionsService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @Get()
    findAll() {
        return this.factionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.factionsService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Faction>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        if (typeof payload.placesIds === 'string') {
            try { payload.placesIds = JSON.parse(payload.placesIds); } catch (e) { }
        }
        if (typeof payload.npcIds === 'string') {
            try { payload.npcIds = JSON.parse(payload.npcIds); } catch (e) { }
        }
        if (typeof payload.characterIds === 'string') {
            try { payload.characterIds = JSON.parse(payload.characterIds); } catch (e) { }
        }
        if (typeof payload.ranks === 'string') {
            try { payload.ranks = JSON.parse(payload.ranks); } catch (e) { payload.ranks = []; }
        }
        if (typeof payload.factionTraits === 'string') {
            try { payload.factionTraits = JSON.parse(payload.factionTraits); } catch (e) { payload.factionTraits = []; }
        }
        if (typeof payload.troops === 'string') {
            try { payload.troops = JSON.parse(payload.troops); } catch (e) { payload.troops = []; }
        }

        return this.factionsService.create(payload as any);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Faction>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        if (typeof payload.placesIds === 'string') {
            try { payload.placesIds = JSON.parse(payload.placesIds); } catch (e) { }
        }
        if (typeof payload.npcIds === 'string') {
            try { payload.npcIds = JSON.parse(payload.npcIds); } catch (e) { }
        }
        if (typeof payload.characterIds === 'string') {
            try { payload.characterIds = JSON.parse(payload.characterIds); } catch (e) { }
        }
        if (typeof payload.ranks === 'string') {
            try { payload.ranks = JSON.parse(payload.ranks); } catch (e) { }
        }
        if (typeof payload.factionTraits === 'string') {
            try { payload.factionTraits = JSON.parse(payload.factionTraits); } catch (e) { }
        }
        if (typeof payload.troops === 'string') {
            try { payload.troops = JSON.parse(payload.troops); } catch (e) { }
        }

        return this.factionsService.update(id, payload as any);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.factionsService.remove(id);
    }
}
