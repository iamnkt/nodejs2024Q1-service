import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneParams {
  @IsUUID()
  id: UUID;
}

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
}
