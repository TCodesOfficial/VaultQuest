import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('popular-games')
  findPopular() {
    return this.gamesService.findPopular();
  }

  @Post()
  addGame(@Body() body: { slug?: string }) {
    const slug = body?.slug;
    if (!slug) {
      throw new BadRequestException('A game slug is required');
    }
    const game = this.gamesService.addGame(slug);
    if (!game) {
      throw new NotFoundException(`No popular game matches slug "${slug}"`);
    }
    return game;
  }
}
