import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RulesService } from './rules.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { Rule } from '../schema/wiki/rule.schema';

@Controller('rules')
export class RulesController {
  constructor(
      private readonly rulesService: RulesService,
      private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  async findAll() {
      return this.rulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return this.rulesService.findOne(id);
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

      return this.rulesService.create(payload);
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

      return this.rulesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      return this.rulesService.remove(id);
  }
}
