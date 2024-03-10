import { UUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/dto/track.dto';
import { UpdatePasswordDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entites/user.entity';

export interface DataStorage {
  users: User[];
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
}

class DataBase {
  dataStorage: DataStorage;

  constructor() {
    this.dataStorage = {
      users: [],
      tracks: [],
      albums: [],
      artists: [],
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

  public deleteUser(id: UUID) {
    const newStorage = this.dataStorage.users.filter((user) => user.id !== id);
    this.dataStorage.users = newStorage;
  }

  public getTracks() {
    return this.dataStorage.tracks;
  }

  public getTrack(id: UUID) {
    const track = this.dataStorage.tracks.find((track) => track.id === id);
    return track;
  }

  public getArtists() {
    return this.dataStorage.artists;
  }

  public getArtist(id: UUID) {
    const artist = this.dataStorage.artists.find((artist) => artist.id === id);
    return artist;
  }

  public createArtist(artist: Artist) {
    this.dataStorage.artists.push(artist);
  }

  public updateArtist(id: UUID, dto: CreateArtistDto) {
    this.dataStorage.artists.forEach((artist) => {
      if (artist.id === id) {
        artist.name = dto.name;
        artist.grammy = dto.grammy;
      }
    });
  }

  public deleteArtist(id: UUID) {
    const newStorage = this.dataStorage.artists.filter((artist) => artist.id !== id);
    this.dataStorage.artists = newStorage;
    this.dataStorage.tracks
      .filter((track) => track.id === id)
      .forEach((track) => track.artistId = null);
    this.dataStorage.albums
      .filter((album) => album.id === id)
      .forEach((album) => album.artistId = null);
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

  public deleteAlbum(id: UUID) {
    const newStorage = this.dataStorage.albums.filter((album) => album.id !== id);
    this.dataStorage.albums = newStorage;
    this.dataStorage.tracks
      .filter((track) => track.albumId === id)
      .forEach((track) => track.albumId = null);
  }
}

const db = new DataBase();

export { db };
