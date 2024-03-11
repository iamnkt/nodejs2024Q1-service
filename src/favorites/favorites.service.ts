import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { Favorites, FavoritesResponse } from './entity';

@Injectable()
export class FavoritesService {
  findAll(): FavoritesResponse {
    const favorites = db.getFavs();
    return favorites;
  }

  add(route: string, id: string) {
    const record = db.findRecord(route, id);

    if (!record) {
      throw new HttpException(
        `${route} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const recordId = record.id;

    const favorite = db.findFavorite(route, id);

    if (!favorite) {
      db.addToFavorites(route, recordId);
    }

    return record;
  }

  remove(route: string, id: string) {
    const record = db.findRecord(route, id);

    const favorite = db.findFavorite(route, id);

    if (record && !favorite) {
      throw new HttpException(`${route} if not favorite`, HttpStatus.NOT_FOUND);
    }

    if (favorite) {
      db.removeFromFavorites(route, id);
    }
  }
}
