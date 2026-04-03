import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GodsService } from './gods.service';
import { God } from '../schema/wiki/god.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('gods')
export class GodsController {
    constructor(
        private readonly godsService: GodsService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get()
    async findAll() {
        return this.godsService.findAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<God>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        // Parse the prayers array if it comes as a stringified JSON
        if (typeof payload.prayers === 'string') {
            try {
                payload.prayers = JSON.parse(payload.prayers);
            } catch (e) {
                // Fallback to array wrap if parsing fails
                payload.prayers = [payload.prayers] as unknown as string[];
            }
        }

        return this.godsService.create(payload);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<God>
    ) {
        const payload = { ...dto };

        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }

        // Parse the prayers array if it comes as a stringified JSON
        if (typeof payload.prayers === 'string') {
            try {
                payload.prayers = JSON.parse(payload.prayers);
            } catch (e) {
                // Leave it as is or handle accordingly
            }
        }

        return this.godsService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.godsService.remove(id);
    }
}
