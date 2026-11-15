import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CharacterSheetsService } from './character-sheets.service';

/**
 * La ficha ya no tiene retrato (vive en el personaje, BRIEFING-JUGADORES
 * §2), asi que las rutas son JSON. Se sigue tolerando que un bloque llegue
 * como JSON en una cadena: solo se deshace lo que venga como cadena.
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

  constructor(private readonly sheetsService: CharacterSheetsService) {}

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

  /** La ficha de un personaje. 404 si aun no tiene. */
  @Get('by-character/:characterId')
  async findByCharacter(@Param('characterId') characterId: string) {
    return this.sheetsService.findByCharacter(characterId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sheetsService.findOne(id);
  }

  /** El creador, en el primer paso mecanico. Pide characterId. */
  @Post()
  async create(@Body() body: any) {
    return this.sheetsService.create(this.deshacerFormData(body));
  }

  /** La ficha de mesa y el final del creador: state, equipment, currency, overrides, notes y completed. */
  @Patch(':id')
  async updateState(@Param('id') id: string, @Body() body: any) {
    return this.sheetsService.updateState(id, this.deshacerFormData(body));
  }

  /** Los pasos del creador y subir de nivel. */
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
