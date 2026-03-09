import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NarrativeArcsService } from './narrative-arcs.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('narrative-arcs')
export class NarrativeArcsController {
  constructor(
    private readonly narrativeArcsService: NarrativeArcsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const arc = await this.narrativeArcsService.create({
      ...data,
      imageUrl,
    });

    return { message: 'Narrative arc created successfully', arc };
  }

  @Get()
  async findAll() {
    return this.narrativeArcsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.narrativeArcsService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
      data.imageUrl = imageUrl;
    }

    const arc = await this.narrativeArcsService.update(id, data);
    return { message: 'Narrative arc updated successfully', arc };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.narrativeArcsService.delete(id);
    return { message: 'Narrative arc deleted successfully' };
  }

  // Session endpoints
  @Post(':id/sessions')
  async addSession(@Param('id') id: string, @Body() sessionData: any) {
    const session = await this.narrativeArcsService.addSession(id, sessionData);
    return { message: 'Session added successfully', session };
  }

  @Patch(':id/sessions/:sessionId')
  async updateSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
    @Body() sessionData: any,
  ) {
    const session = await this.narrativeArcsService.updateSession(
      id,
      sessionId,
      sessionData,
    );
    return { message: 'Session updated successfully', session };
  }

  @Delete(':id/sessions/:sessionId')
  async deleteSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    await this.narrativeArcsService.deleteSession(id, sessionId);
    return { message: 'Session deleted successfully' };
  }
}
