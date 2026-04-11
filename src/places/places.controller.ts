import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from 'src/schema/places/places.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { UpdatePlaceDescriptionDto } from './dtos/update-place-description.dto';
import { AddNamedDescriptionDto, UpdateNamedDescriptionDto } from './dtos/update-place-named-description.dto';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { UpdatePlaceDto } from './dtos/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly placesService: PlacesService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() placeData: CreatePlaceDto
  ) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    const newPlace = await this.placesService.create({ ...placeData, imageUrl });

    return { message: 'Lugar creado exitosamente', place: newPlace };
  }

  @Get()
  async findAll() {
    return this.placesService.findAll();
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOneDetailsById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePlaceDto: UpdatePlaceDto
  ) {
    const payload: Partial<Place> = { ...updatePlaceDto };

    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      payload.imageUrl = imageUrl;
    }

    const updated = await this.placesService.update(id, payload);
    return { message: 'Lugar actualizado', place: updated };
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
    const updated = await this.placesService.updateImage(id, imageUrl);
    return { message: 'Imagen actualizada', place: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.placesService.remove(id);
    return { message: 'Lugar eliminado' };
  }

  @Patch(':id/description')
  updateDescription(
    @Param('id') id: string,
    @Body() dto: UpdatePlaceDescriptionDto,
  ) {
    return this.placesService.updateDescriptionHtml(id, dto.descriptionHtml);
  }

  // --- GENERIC SUB-ITEM ENDPOINTS ---

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
    return this.placesService.addSubItem(id, category, { ...dto, imageUrl });
  }

  @Patch(':id/:category/:itemId')
  @UseInterceptors(FileInterceptor('file'))
  async updateSubItem(
    @Param('id') id: string,
    @Param('category') category: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateNamedDescriptionDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    return this.placesService.updateSubItem(id, category, itemId, { ...dto, imageUrl });
  }

  @Delete(':id/:category/:itemId')
  deleteSubItem(
    @Param('id') id: string,
    @Param('category') category: string,
    @Param('itemId') itemId: string
  ) {
    return this.placesService.deleteSubItem(id, category, itemId);
  }

  @Patch(':id/npcs')
  @UseInterceptors(FileInterceptor('file'))
  async addNpc(
    @Param('id') id: string,
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const payload = { ...dto };
    if (imageUrl) payload.imageUrl = imageUrl;

    return this.placesService.addNpc(id, payload);
  }

  @Patch(':id/npcs/:npcId')
  @UseInterceptors(FileInterceptor('file'))
  async updateNpc(
    @Param('id') id: string,
    @Param('npcId') npcId: string,
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const payload = { ...dto };
    if (imageUrl) payload.imageUrl = imageUrl;

    return this.placesService.updateNpc(id, npcId, payload);
  }

  @Delete(':id/npcs/:npcId')
  deleteNpc(@Param('id') id: string, @Param('npcId') npcId: string) {
    return this.placesService.deleteNpc(id, npcId);
  }
}
