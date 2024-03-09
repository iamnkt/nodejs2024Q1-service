import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneParams {
  @IsUUID()
  id: UUID;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string; 
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}