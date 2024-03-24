import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const favs = (await this.databaseService.favs.findMany({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      }
    }))[0];

    if (!favs) {
      const favsId = {
        id: crypto.randomUUID(),
      };

      await this.databaseService.favs.create({ data: favsId });
      return {
        artists: [],
        albums: [],
        tracks: [],
      }
    }
    
    return favs;
  }

  async add(route: string, id: string) {
    const record = await this.databaseService[route].findUnique({
      where: {
        id,
      },
    });

    if (!record) {
      throw new HttpException(
        `${route} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favs = (await this.databaseService.favs.findMany({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      }
    }))[0];

    const isFavorite = favs[`${route}s`].find((entity) => entity.id === id);

    if (!isFavorite) {
      await this.databaseService.favs.update({
        where: {
          id: favs.id,
        },
        data: {
          [`${route}s`]: {
            connect: { id }
          }
        },
      });
    }

    return record;
  }

  async remove(route: string, id: string) {
    const record = this.databaseService[route].findUnique({
      where: {
        id,
      },
    });

    const favs = (await this.databaseService.favs.findMany({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      }
    }))[0];

    const isFavorite = favs[`${route}s`].find((entity) => entity.id === id);

    if (record && !isFavorite) {
      throw new HttpException(`${route} is not favorite`, HttpStatus.NOT_FOUND);
    }

    if (isFavorite) {
      return await this.databaseService.favs.update({
        where: {
          id: favs.id,
        },
        data: {
          [`${route}s`]: {
            disconnect: { id }
          }
        },
      });
    }
  }
}
