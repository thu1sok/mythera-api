import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from 'src/schema/places/places.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly placesService: PlacesService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() placeData: Place
  ) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    
    const newPlace = await this.placesService.create({ ...placeData, imageUrl });

    return { message: 'Lugar creado exitosamente', place: newPlace };
  }

  @Get()
  async findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePlaceDto: Partial<Place>
  ) {
    const payload: Partial<Place> = { ...updatePlaceDto };

    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      payload.imageUrl = imageUrl;
    }

    const updated = await this.placesService.update(id, payload);
    return { message: 'Lugar actualizado', place: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.placesService.remove(id);
    return { message: 'Lugar eliminado' };
  }
}
