import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CharacterSheetsService } from './character-sheets.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';

/**
 * Las rutas que escriben aceptan multipart/form-data, igual que el resto de
 * la app: el retrato viaja en el campo 'file' y lo sube CloudinaryService.
 *
 * Con FormData todo llega como texto, asi que los bloques que son objetos
 * (build, state, equipment, currency, overrides) viajan como JSON en una
 * cadena y hay que deshacerlos aqui. Si el cliente manda JSON normal, sin
 * fichero, tambien funciona: solo se deshace lo que venga como cadena.
 */
@Controller('character-sheets')
export class CharacterSheetsController {
  private static readonly BLOQUES = [
    'build',
    'state',
    'equipment',
    'currency',
    'overrides',
  ];

  constructor(
    private readonly sheetsService: CharacterSheetsService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  private deshacerFormData(body: any): any {
    const salida = { ...body };
    for (const clave of CharacterSheetsController.BLOQUES) {
      if (typeof salida[clave] === 'string') {
        try {
          salida[clave] = JSON.parse(salida[clave]);
        } catch {
          throw new BadRequestException(
            `El campo '${clave}' tiene que ser JSON valido.`,
          );
        }
      }
    }
    return salida;
  }

  @Get()
  async findAll() {
    return this.sheetsService.findAll();
  }

  /** Todas las fichas de un jugador. Lista vacia si no tiene ninguna. */
  @Get('by-player/:playerId')
  async findByPlayer(@Param('playerId') playerId: string) {
    return this.sheetsService.findByPlayer(playerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sheetsService.findOne(id);
  }

  /** El creador, al terminar. */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: any, @UploadedFile() file?: Express.Multer.File) {
    const datos = this.deshacerFormData(body);
    if (file) {
      datos.portraitUrl = await this.cloudinary.uploadImage(file);
    }
    return this.sheetsService.create(datos);
  }

  /** La ficha de mesa: state, equipment, currency, overrides y notes. */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateState(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const datos = this.deshacerFormData(body);
    if (file) {
      datos.portraitUrl = await this.cloudinary.uploadImage(file);
    }
    return this.sheetsService.updateState(id, datos);
  }

  /** Subir de nivel. */
  @Patch(':id/build')
  async updateBuild(@Param('id') id: string, @Body() body: any) {
    return this.sheetsService.updateBuild(id, this.deshacerFormData(body));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.sheetsService.remove(id);
    return { message: 'Ficha eliminada correctamente' };
  }
}
