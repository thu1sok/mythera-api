import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EternalsService } from './eternals.service';
import { Eternal } from '../schema/wiki/eternal.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('eternals')
export class EternalsController {
    constructor(
        private readonly eternalsService: EternalsService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get()
    async findAll() {
        return this.eternalsService.findAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Eternal>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        return this.eternalsService.create(payload);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Eternal>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        return this.eternalsService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.eternalsService.remove(id);
    }
}
