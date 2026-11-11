import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompendiumService } from './compendium.service';
import { FeatCategory } from '../schema/wiki/compendium/compendium-feat.schema';
import { ItemCategory } from '../schema/wiki/compendium/compendium-item.schema';

@Controller('compendium')
export class CompendiumController {
  constructor(private readonly compendiumService: CompendiumService) {}

  // ==========================================
  // METADATA & CHARACTER CREATOR EXPORT
  // ==========================================
  @Get('catalogs')
  getCatalogs() {
    return this.compendiumService.getCatalogs();
  }

  @Get('export')
  async getFullExport() {
    return this.compendiumService.getFullExport();
  }

  // ==========================================
  // 1. RASGOS HUMANOS
  // ==========================================
  @Get('traits')
  async findAllTraits() {
    return this.compendiumService.findAllTraits();
  }

  @Post('traits')
  async createTrait(@Body() body: any) {
    return this.compendiumService.createTrait(body);
  }

  @Patch('traits/:id')
  async updateTrait(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateTrait(id, body);
  }

  @Delete('traits/:id')
  async deleteTrait(@Param('id') id: string) {
    await this.compendiumService.deleteTrait(id);
    return { message: 'Rasgo eliminado correctamente' };
  }

  // ==========================================
  // 2. DOTES (ORIGIN, GENERAL & COMBAT_TECHNIQUE)
  // ==========================================
  @Get('feats')
  async findAllFeats(@Query('category') category?: FeatCategory) {
    return this.compendiumService.findAllFeats(category);
  }

  @Post('feats')
  async createFeat(@Body() body: any) {
    return this.compendiumService.createFeat(body);
  }

  @Patch('feats/:id')
  async updateFeat(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateFeat(id, body);
  }

  @Delete('feats/:id')
  async deleteFeat(@Param('id') id: string) {
    await this.compendiumService.deleteFeat(id);
    return { message: 'Dote eliminada correctamente' };
  }

  // ==========================================
  // 3. ESTILOS
  // ==========================================
  @Get('styles')
  async findAllStyles() {
    return this.compendiumService.findAllStyles();
  }

  @Post('styles')
  async createStyle(@Body() body: any) {
    return this.compendiumService.createStyle(body);
  }

  @Patch('styles/:id')
  async updateStyle(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateStyle(id, body);
  }

  @Delete('styles/:id')
  async deleteStyle(@Param('id') id: string) {
    await this.compendiumService.deleteStyle(id);
    return { message: 'Estilo eliminado correctamente' };
  }

  // ==========================================
  // 4. ARQUETIPOS
  // ==========================================
  @Get('archetypes')
  async findAllArchetypes() {
    return this.compendiumService.findAllArchetypes();
  }

  @Post('archetypes')
  async createArchetype(@Body() body: any) {
    return this.compendiumService.createArchetype(body);
  }

  @Patch('archetypes/:id')
  async updateArchetype(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateArchetype(id, body);
  }

  @Delete('archetypes/:id')
  async deleteArchetype(@Param('id') id: string) {
    await this.compendiumService.deleteArchetype(id);
    return { message: 'Arquetipo eliminado correctamente' };
  }

  // ==========================================
  // 5. RAZAS
  // ==========================================
  @Get('races')
  async findAllRaces() {
    return this.compendiumService.findAllRaces();
  }

  @Post('races')
  async createRace(@Body() body: any) {
    return this.compendiumService.createRace(body);
  }

  @Patch('races/:id')
  async updateRace(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateRace(id, body);
  }

  @Delete('races/:id')
  async deleteRace(@Param('id') id: string) {
    await this.compendiumService.deleteRace(id);
    return { message: 'Raza eliminada correctamente' };
  }

  // ==========================================
  // 6. OBJETOS, ARMAS Y EQUIPO
  // ==========================================
  @Get('items')
  async findAllItems(@Query('category') category?: ItemCategory) {
    return this.compendiumService.findAllItems(category);
  }

  @Get('items/:slug')
  async findItemBySlug(@Param('slug') slug: string) {
    return this.compendiumService.findItemBySlug(slug);
  }

  @Post('items')
  async createItem(@Body() body: any) {
    return this.compendiumService.createItem(body);
  }

  @Patch('items/:id')
  async updateItem(@Param('id') id: string, @Body() body: any) {
    return this.compendiumService.updateItem(id, body);
  }

  @Delete('items/:id')
  async deleteItem(@Param('id') id: string) {
    await this.compendiumService.deleteItem(id);
    return { message: 'Objeto eliminado correctamente' };
  }
}
