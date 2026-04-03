import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { Character } from '../schema/wiki/character.schema';

@Controller('characters')
export class CharactersController {
    constructor(
        private readonly charactersService: CharactersService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Character>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        // Parse traits if sent as JSON string in FormData
        if (typeof payload.deitiesIds === 'string') {
            try { payload.deitiesIds = JSON.parse(payload.deitiesIds); } catch (e) { }
        }
        if (typeof payload.eventsAndAchievements === 'string') {
            try { payload.eventsAndAchievements = JSON.parse(payload.eventsAndAchievements); } catch (e) { payload.eventsAndAchievements = []; }
        }
        if (typeof payload.plotItems === 'string') {
            try { payload.plotItems = JSON.parse(payload.plotItems); } catch (e) { payload.plotItems = []; }
        }

        return this.charactersService.create(payload as any);
    }

    @Get()
    findAll() {
        return this.charactersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.charactersService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Character>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        if (typeof payload.deitiesIds === 'string') {
            try { payload.deitiesIds = JSON.parse(payload.deitiesIds); } catch (e) { }
        }
        if (typeof payload.eventsAndAchievements === 'string') {
            try { payload.eventsAndAchievements = JSON.parse(payload.eventsAndAchievements); } catch (e) { }
        }
        if (typeof payload.plotItems === 'string') {
            try { payload.plotItems = JSON.parse(payload.plotItems); } catch (e) { }
        }

        return this.charactersService.update(id, payload as any);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.charactersService.remove(id);
    }
}
