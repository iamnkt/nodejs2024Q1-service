import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Favorites, FavoritesResponse } from './entity';
import { FavoritesService } from './favorites.service';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post(':route/:id')
  add(@Param('route') route: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.add(route, id);
  }

  @Delete(':route/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('route') route: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.remove(route, id);
  }
}
