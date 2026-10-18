import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, GamesModule, AuthModule],
})
export class AppModule {}
