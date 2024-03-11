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
import { FavoritesResponse } from './entity';
import { FavoritesService } from './favorites.service';

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
