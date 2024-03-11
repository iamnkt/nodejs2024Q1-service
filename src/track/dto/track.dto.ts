import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParams {
  @IsUUID()
  id: UUID;
}

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
