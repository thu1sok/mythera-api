import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { Player } from '../schema/wiki/player.schema';

@Controller('players')
export class PlayersController {
    constructor(
        private readonly playersService: PlayersService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Player>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }
        return this.playersService.create(payload as any);
    }

    @Get()
    findAll() {
        return this.playersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playersService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: Partial<Player>
    ) {
        const payload = { ...dto };
        if (file) {
            payload.imageUrl = await this.cloudinaryService.uploadImage(file);
        }
        return this.playersService.update(id, payload as any);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.playersService.remove(id);
    }
}
