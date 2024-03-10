import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { db } from 'src/db/db';
import { CreateArtistDto } from './dto';
import { Artist } from './entities';

@Injectable()
export class ArtistService {
  create(dto: CreateArtistDto): Artist {
    const artist = {
      id: crypto.randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    }
    db.createArtist(artist);

    return artist;
  }

  findAll(): Artist[] {
    const artists = db.getArtists();

    return artists;
  }
  
  findOne(params: { id: UUID }) {
    const artist = db.getArtist(params.id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(params: { id: UUID }, dto: CreateArtistDto) {
    const artistToUpdate = db.getArtist(params.id);
    if (!artistToUpdate) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    } else {
      db.updateArtist(params.id, dto);
    }
  }

  remove(params: { id: UUID }) {
    const artistToDelete = db.getArtist(params.id);
    if (!artistToDelete) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    } else {
      db.deleteArtist(params.id);
    }
  }
}
