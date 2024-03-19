import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { AlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async create(dto: AlbumDto) {
    const album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    return this.databaseService.album.create({ data: album });
  }

  async findAll() {
    return this.databaseService.album.findMany({});
  }

  async findOne(params: { id: UUID }) {
    const album = await this.databaseService.album.findUnique({
      where: {
        id: params.id,
      }
    });
    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    };
    return album;
  }

  async update(params: { id: UUID }, dto: AlbumDto) {
    const albumToUpdate = await this.databaseService.album.findUnique({
      where: {
        id: params.id,
      }
    });
    if (!albumToUpdate) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.album.update({
        where: {
          id: params.id,
        },
        data: dto,
      });
    };
  }

  async remove(params: { id: UUID }) {
    const albumToDelete = await this.databaseService.album.findUnique({
      where: {
        id: params.id,
      }
    });
    if (!albumToDelete) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.album.delete({
        where: { id: params.id },
      });
    };
  }
}
