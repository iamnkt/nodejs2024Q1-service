import { UUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto';
import { Album } from 'src/album/entities';
import { ArtistDto } from 'src/artist/dto';
import { Favorites } from 'src/favorites/entity';
import { CreateTrackDto } from 'src/track/dto';
import { Track } from 'src/track/entites';
import { UpdatePasswordDto } from 'src/user/dto';
import { User } from 'src/user/entites';

export interface DataStorage {
  users: User[];
  tracks: Track[];
  albums: Album[];
  // artists: Artist[];
  favorites: Favorites;
}

class DataBase {
  dataStorage: DataStorage;

  constructor() {
    this.dataStorage = {
      users: [],
      tracks: [],
      albums: [],
      // artists: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }

  public getUsers() {
    return this.dataStorage.users;
  }

  public createUser(user: User) {
    this.dataStorage.users.push(user);
  }

  public getUser(id: UUID) {
    const user = this.dataStorage.users.find((user) => user.id === id);
    return user;
  }

  public updatePassword(id: UUID, dto: UpdatePasswordDto) {
    this.dataStorage.users.forEach((user) => {
      if (user.id === id) {
        user.password = dto.newPassword;
        user.updatedAt = Date.now();
        user.version += 1;
      }
    });
  }

  public removeUser(id: UUID) {
    const newUsersStorage = this.dataStorage.users.filter(
      (user) => user.id !== id,
    );
    this.dataStorage.users = newUsersStorage;
  }

  public getTracks() {
    return this.dataStorage.tracks;
  }

  public getTrack(id: UUID) {
    const track = this.dataStorage.tracks.find((track) => track.id === id);
    return track;
  }

  public createTrack(track: Track) {
    this.dataStorage.tracks.push(track);
  }

  public updateTrack(id: UUID, dto: CreateTrackDto) {
    this.dataStorage.tracks.forEach((track) => {
      if (track.id === id) {
        track.name = dto.name;
        track.artistId = dto.artistId;
        track.albumId = dto.albumId;
        track.duration = dto.duration;
      }
    });
  }

  public removeTrack(id: UUID) {
    const newTracksStorage = this.dataStorage.tracks.filter(
      (track) => track.id !== id,
    );
    this.dataStorage.tracks = newTracksStorage;
    const favTrackId = this.dataStorage.favorites.tracks.find(
      (track) => track === id,
    );
    if (favTrackId) {
      const favTrackIdx = this.dataStorage.favorites.tracks.indexOf(favTrackId);
      this.dataStorage.favorites.tracks.splice(favTrackIdx, 1);
    }
  }

  public getAlbums() {
    return this.dataStorage.albums;
  }

  public getAlbum(id: UUID) {
    const album = this.dataStorage.albums.find((album) => album.id === id);
    return album;
  }

  public createAlbum(album: Album) {
    this.dataStorage.albums.push(album);
  }

  public updateAlbum(id: UUID, dto: CreateAlbumDto) {
    this.dataStorage.albums.forEach((album) => {
      if (album.id === id) {
        album.name = dto.name;
        album.year = dto.year;
        album.artistId = dto.artistId;
      }
    });
  }

  public removeAlbum(id: UUID) {
    const newAlbumsStorage = this.dataStorage.albums.filter(
      (album) => album.id !== id,
    );
    this.dataStorage.albums = newAlbumsStorage;
    this.dataStorage.tracks
      .filter((track) => track.albumId === id)
      .forEach((track) => (track.albumId = null));
    const favAlbumId = this.dataStorage.favorites.albums.find(
      (album) => album === id,
    );
    if (favAlbumId) {
      const favAlbumIdx = this.dataStorage.favorites.albums.indexOf(favAlbumId);
      this.dataStorage.favorites.albums.splice(favAlbumIdx, 1);
    }
  }

  // public getArtists() {
  //   return this.dataStorage.artists;
  // }

  // public getArtist(id: UUID) {
  //   const artist = this.dataStorage.artists.find((artist) => artist.id === id);
  //   return artist;
  // }

  // public createArtist(artist: Artist) {
  //   this.dataStorage.artists.push(artist);
  // }

  // public updateArtist(id: UUID, dto: CreateArtistDto) {
  //   this.dataStorage.artists.forEach((artist) => {
  //     if (artist.id === id) {
  //       artist.name = dto.name;
  //       artist.grammy = dto.grammy;
  //     }
  //   });
  // }

  // public removeArtist(id: UUID) {
  //   const newArtistsStorage = this.dataStorage.artists.filter(
  //     (artist) => artist.id !== id,
  //   );
  //   this.dataStorage.artists = newArtistsStorage;
  //   this.dataStorage.tracks
  //     .filter((track) => track.artistId === id)
  //     .forEach((track) => (track.artistId = null));
  //   this.dataStorage.albums
  //     .filter((album) => album.artistId === id)
  //     .forEach((album) => (album.artistId = null));
  //   const favArtistId = this.dataStorage.favorites.artists.find(
  //     (artist) => artist === id,
  //   );
  //   if (favArtistId) {
  //     const favArtistIdx =
  //       this.dataStorage.favorites.artists.indexOf(favArtistId);
  //     this.dataStorage.favorites.artists.splice(favArtistIdx, 1);
  //   }
  // }

  public getFavs() {
    const artists = this.dataStorage.favorites.artists.map((id) => {
      return this.findRecord('artist', id);
    });
    const albums = this.dataStorage.favorites.albums.map((id) => {
      return this.findRecord('album', id);
    });
    const tracks = this.dataStorage.favorites.tracks.map((id) => {
      return this.findRecord('track', id);
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  public findRecord(route: string, id: string) {
    const record = this.dataStorage[`${route}s`].find(
      (record) => record.id === id,
    );
    return record;
  }

  public findFavorite(route: string, id: string) {
    const favorite = this.dataStorage.favorites[`${route}s`].find(
      (favoriteId) => favoriteId === id,
    );
    return favorite;
  }

  public addToFavorites(route: string, id: string) {
    this.dataStorage.favorites[`${route}s`].push(id);
  }

  public removeFromFavorites(route: string, id: string) {
    const newStorage = this.dataStorage.favorites[`${route}s`].filter(
      (favoriteId) => favoriteId !== id,
    );
    this.dataStorage.favorites[`${route}s`] = newStorage;
  }
}

const db = new DataBase();

export { db };
