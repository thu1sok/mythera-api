import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DurmientePlacesService } from './durmiente-places.service';
import { DurmientePlace } from '../schema/places/durmiente-places.schema';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { CreatePlaceDto } from '../places/dtos/create-place.dto';
import { UpdatePlaceDto } from '../places/dtos/update-place.dto';
import { UpdatePlaceDescriptionDto } from '../places/dtos/update-place-description.dto';
import { AddNamedDescriptionDto } from '../places/dtos/update-place-named-description.dto';

@Controller('durmiente-places')
export class DurmientePlacesController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly durmientePlacesService: DurmientePlacesService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() placeData: CreatePlaceDto
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const newPlace = await this.durmientePlacesService.create({ ...placeData, imageUrl });
    return { message: 'Lugar durmiente creado exitosamente', place: newPlace };
  }

  @Get()
  async findAll() {
    return this.durmientePlacesService.findAll();
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return this.durmientePlacesService.findOneDetailsById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePlaceDto: UpdatePlaceDto
  ) {
    const payload: Partial<DurmientePlace> = { ...updatePlaceDto };

    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      payload.imageUrl = imageUrl;
    }

    const updated = await this.durmientePlacesService.update(id, payload);
    return { message: 'Lugar durmiente actualizado', place: updated };
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file);
    const updated = await this.durmientePlacesService.updateImage(id, imageUrl);
    return { message: 'Imagen actualizada', place: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.durmientePlacesService.remove(id);
    return { message: 'Lugar durmiente eliminado' };
  }

  @Patch(':id/description')
  updateDescription(
    @Param('id') id: string,
    @Body() dto: UpdatePlaceDescriptionDto,
  ) {
    return this.durmientePlacesService.updateDescriptionHtml(id, dto.descriptionHtml);
  }

  @Patch(':id/:category')
  @UseInterceptors(FileInterceptor('file'))
  async addSubItem(
    @Param('id') id: string,
    @Param('category') category: string,
    @Body() dto: AddNamedDescriptionDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    return this.durmientePlacesService.addSubItem(id, category, { ...dto, imageUrl });
  }
}
