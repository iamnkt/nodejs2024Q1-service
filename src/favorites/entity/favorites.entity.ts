import { Album } from 'src/album/entities';
import { Artist } from 'src/artist/entities';
import { Track } from 'src/track/entites';

export class Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type Entity = 'track' | 'album' | 'artist';
