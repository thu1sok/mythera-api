import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WikiHomeService } from './wiki-home.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wiki-home')
@UseGuards(JwtAuthGuard)
export class WikiHomeController {
  constructor(private readonly wikiHomeService: WikiHomeService) {}

  @Get()
  getConfig() {
    return this.wikiHomeService.getConfig();
  }

  @Post()
  updateConfig(@Body('pinnedSessions') pinnedSessions: any[]) {
    return this.wikiHomeService.updateConfig(pinnedSessions);
  }
}
