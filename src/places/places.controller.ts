import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from 'src/schema/places/places.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { UpdatePlaceDescriptionDto } from './dtos/update-place-description.dto';
import { UpdatePlaceCreaturesDto } from './dtos/update-place-creatures.dto';
import { AddNamedDescriptionDto } from './dtos/update-place-named-description.dto';

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

  @Get('details/:id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOneDetailsById(id);
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

  @Patch(':id/creatures')
  updateCreatures(
    @Param('id') id: string,
    @Body() dto: UpdatePlaceCreaturesDto,
  ) {
    return this.placesService.updateCreatures(id, dto);
  }

  @Patch(':id/objects')
  addObject(@Param('id') id: string, @Body() dto: AddNamedDescriptionDto) {
    return this.placesService.addObject(id, dto);
  }

  @Patch(':id/objects/:objectId')
  updateObject(
    @Param('id') id: string,
    @Param('objectId') objectId: string,
    @Body() dto: AddNamedDescriptionDto,
  ) {
    return this.placesService.updateObject(id, objectId, dto);
  }

  @Delete(':id/objects/:objectId')
  deleteObject(
    @Param('id') id: string,
    @Param('objectId') objectId: string,
  ) {
    return this.placesService.deleteObjectById(id, objectId);
  }

  @Patch(':id/army')
  addArmy(@Param('id') id: string, @Body() dto: AddNamedDescriptionDto) {
    return this.placesService.addArmyUnit(id, dto);
  }

  @Patch(':id/army/:armyItemId')
  updateArmy(
    @Param('id') id: string,
    @Param('armyItemId') armyItemId: string,
    @Body() dto: AddNamedDescriptionDto,
  ) {
    return this.placesService.updateArmyUnit(id, armyItemId, dto);
  }

  @Delete(':id/army/:armyItemId')
  deleteArmy(@Param('id') id: string, @Param('armyItemId') armyItemId: string) {
    return this.placesService.deleteArmyUnit(id, armyItemId);
  }

  @Patch(':id/places-of-interest')
  addPlaceOfInterest(@Param('id') id: string, @Body() dto: AddNamedDescriptionDto) {
    return this.placesService.addPlaceOfInterest(id, dto);
  }

  @Patch(':id/places-of-interest/:placeId')
  updatePlaceOfInterest(
    @Param('id') id: string,
    @Param('placeId') placeId: string,
    @Body() dto: AddNamedDescriptionDto,
  ) {
    return this.placesService.updatePlaceOfInterest(id, placeId, dto);
  }

  @Delete(':id/places-of-interest/:placeId')
  deletePlaceOfInterest(
    @Param('id') id: string,
    @Param('placeId') placeId: string,
  ) {
    return this.placesService.deletePlaceOfInterest(id, placeId);
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
