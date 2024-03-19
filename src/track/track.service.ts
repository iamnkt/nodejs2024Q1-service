import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateTrackDto } from './dto';

@Injectable()
export class TrackService {
  // create(dto: CreateTrackDto): Track {
  //   const track = {
  //     id: crypto.randomUUID(),
  //     name: dto.name,
  //     artistId: dto.artistId,
  //     albumId: dto.albumId,
  //     duration: dto.duration,
  //   };

  //   db.createTrack(track);
  //   return track;
  // }

  // findAll(): Track[] {
  //   const tracks = db.getTracks();
  //   return tracks;
  // }

  // findOne(params: { id: UUID }) {
  //   const track = db.getTrack(params.id);
  //   if (!track) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   }
  //   return track;
  // }

  // update(params: { id: UUID }, dto: CreateTrackDto) {
  //   const trackToUpdate = db.getTrack(params.id);
  //   if (!trackToUpdate) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   } else {
  //     db.updateTrack(params.id, dto);
  //   }
  // }

  // remove(params: { id: UUID }) {
  //   const trackToDelete = db.getTrack(params.id);
  //   if (!trackToDelete) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   } else {
  //     db.removeTrack(params.id);
  //   }
  // }
}
