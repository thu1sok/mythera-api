import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HistoricalEventsService } from './historical-events.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { HistoricalEvent } from '../schema/wiki/historical-event.schema';

@Controller('historical-events')
export class HistoricalEventsController {
  constructor(
      private readonly historicalEventsService: HistoricalEventsService,
      private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  async findAll() {
      return this.historicalEventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return this.historicalEventsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() createDto: any
  ) {
      let imageUrl: string | undefined;
      
      if (file) {
          imageUrl = await this.cloudinaryService.uploadImage(file);
      }

      const payload = { ...createDto };
      if (imageUrl) payload.imageUrl = imageUrl;

      return this.historicalEventsService.create(payload);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() updateDto: any
  ) {
      let imageUrl: string | undefined;

      if (file) {
          imageUrl = await this.cloudinaryService.uploadImage(file);
      }

      const payload = { ...updateDto };
      if (imageUrl) payload.imageUrl = imageUrl;

      return this.historicalEventsService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      return this.historicalEventsService.remove(id);
  }
}
