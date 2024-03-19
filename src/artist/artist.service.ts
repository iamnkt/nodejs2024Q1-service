import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { ArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: ArtistDto) {
    const artistData = {
      id: crypto.randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    return this.databaseService.artist.create({ data: artistData });
  }

  async findAll() {
    return this.databaseService.artist.findMany({});
  }

  async findOne(params: { id: UUID }) {
    const artist = await this.databaseService.artist.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!artist) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(params: { id: UUID }, dto: ArtistDto) {
    const artistToUpdate = await this.databaseService.artist.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!artistToUpdate) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.artist.update({
        where: {
          id: params.id,
        },
        data: dto,
      });
    }
  }

  async remove(params: { id: UUID }) {
    const artistToDelete = await this.databaseService.artist.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!artistToDelete) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.artist.delete({
        where: { id: params.id },
      });
    }
  }
}
