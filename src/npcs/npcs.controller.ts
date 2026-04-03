import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NpcsService } from './npcs.service';
import { Npc } from '../schema/wiki/npc.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('npcs')
export class NpcsController {
    constructor(
        private readonly npcsService: NpcsService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @Get()
    findAll() {
        return this.npcsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.npcsService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Npc>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }
        return this.npcsService.create(payload as any);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Npc>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }
        return this.npcsService.update(id, payload as any);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.npcsService.remove(id);
    }
}
