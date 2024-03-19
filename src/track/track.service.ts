import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { TrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: TrackDto) {
    const trackData = {
      id: crypto.randomUUID(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    return this.databaseService.track.create({ data: trackData });
  }

  async findAll() {
    return this.databaseService.track.findMany({});
  }

  async findOne(params: { id: UUID }) {
    const track = await this.databaseService.track.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!track) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(params: { id: UUID }, dto: TrackDto) {
    const trackToUpdate = await this.databaseService.track.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!trackToUpdate) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.track.update({
        where: {
          id: params.id,
        },
        data: dto,
      });
    }
  }

  async remove(params: { id: UUID }) {
    const trackToDelete = await this.databaseService.track.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!trackToDelete) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.track.delete({
        where: { id: params.id },
      });
    }
  }
}
