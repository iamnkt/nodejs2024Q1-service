import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    let favs = (await this.databaseService.favs.findMany({}))[0];

    if (!favs) {
      const favsData = {
        id: crypto.randomUUID(),
        artists: [],
        albums: [],
        tracks: [],
      };

      await this.databaseService.favs.create({ data: favsData });
      favs = (await this.databaseService.favs.findMany({}))[0];
    }

    const artists = await Promise.all(
      favs.artists.map(async (id) => {
        return await this.databaseService.artist.findUnique({
          where: {
            id,
          },
        });
      }),
    );

    const albums = await Promise.all(
      favs.albums.map(async (id) => {
        return await this.databaseService.album.findUnique({
          where: {
            id,
          },
        });
      }),
    );

    const tracks = await Promise.all(
      favs.tracks.map(async (id) => {
        return await this.databaseService.track.findUnique({
          where: {
            id,
          },
        });
      }),
    );

    const result = {
      artists: artists.filter((artist) => artist !== null) ?? [],
      albums: albums.filter((album) => album !== null) ?? [],
      tracks: tracks.filter((track) => track !== null) ?? [],
    };

    return result;
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

    let favs = (await this.databaseService.favs.findMany({}))[0];

    if (!favs) {
      const favsData = {
        id: crypto.randomUUID(),
        artists: [],
        albums: [],
        tracks: [],
      };

      await this.databaseService.favs.create({ data: favsData });
      favs = (await this.databaseService.favs.findMany({}))[0];
    }

    const favorite = favs[`${route}s`].find((favoriteId) => favoriteId === id);

    if (!favorite) {
      favs[`${route}s`].push(id);

      await this.databaseService.favs.update({
        where: {
          id: favs.id,
        },
        data: {
          [`${route}s`]: favs[`${route}s`],
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

    const favs = (await this.databaseService.favs.findMany({}))[0];

    const favorite = favs[`${route}s`].find((favoriteId) => favoriteId === id);

    if (record && !favorite) {
      throw new HttpException(`${route} is not favorite`, HttpStatus.NOT_FOUND);
    }

    if (favorite) {
      const idxRemoveTo = favs[`${route}s`].indexOf(id);

      favs[`${route}s`].splice(idxRemoveTo, 1);

      return await this.databaseService.favs.update({
        where: {
          id: favs.id,
        },
        data: {
          [`${route}s`]: favs[`${route}s`],
        },
      });
    }
  }
}
