import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WoundTypesService } from './wound-types.service';

/** Catalogo de tipos de herida: cualquiera los lista, los crea y los borra (no hay permisos). */
@Controller('wound-types')
export class WoundTypesController {
  constructor(private readonly service: WoundTypesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
