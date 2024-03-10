import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { db } from 'src/db/db';
import { CreateAlbumDto } from './dto';
import { Album } from './entities';

@Injectable()
export class AlbumService {
  create(dto: CreateAlbumDto): Album {
    const album = {
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    }
    
    db.createAlbum(album);
    return album;
  }

  findAll(): Album[] {
    const artists = db.getAlbums();
    return artists;
  }
  
  findOne(params: { id: UUID }) {
    const album = db.getAlbum(params.id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(params: { id: UUID }, dto: CreateAlbumDto) {
    const albumToUpdate = db.getAlbum(params.id);
    if (!albumToUpdate) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    } else {
      db.updateAlbum(params.id, dto);
    }
  }

  remove(params: { id: UUID }) {
    const albumToDelete = db.getAlbum(params.id);
    if (!albumToDelete) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    } else {
      db.removeAlbum(params.id);
    }
  }
}
