import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DurmienteRegionsService } from './durmiente-regions.service';
import { CreateRegionDto } from '../regions/dto/create-region.dto';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Controller('durmiente-regions')
export class DurmienteRegionsController {
  constructor(
    private readonly regionsService: DurmienteRegionsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateRegionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    if (typeof (dto as any).points === 'string') {
      (dto as any).points = JSON.parse((dto as any).points);
    }
    if ((dto as any).fillOpacity !== undefined) {
      (dto as any).fillOpacity = parseFloat((dto as any).fillOpacity);
    }
    return this.regionsService.create(dto, imageUrl);
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateRegionDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    if (typeof (dto as any).points === 'string') {
      (dto as any).points = JSON.parse((dto as any).points);
    }
    if ((dto as any).fillOpacity !== undefined) {
      (dto as any).fillOpacity = parseFloat((dto as any).fillOpacity);
    }
    return this.regionsService.update(id, dto, imageUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
