import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RacesService } from './races.service';
import { Race } from '../schema/wiki/race.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('races')
export class RacesController {
    constructor(
        private readonly racesService: RacesService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get()
    async findAll() {
        return this.racesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.racesService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Race>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        return this.racesService.create(payload);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Race>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        return this.racesService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.racesService.remove(id);
    }
}
