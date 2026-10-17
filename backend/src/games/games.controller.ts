import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const game = await this.gamesService.findOne(id);
    if (!game) {
      throw new NotFoundException(`No game with id "${id}"`);
    }
    return game;
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
