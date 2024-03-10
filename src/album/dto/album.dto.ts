import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneParams {
  @IsUUID()
  id: UUID;
}

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
