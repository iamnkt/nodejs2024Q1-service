import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto, FindOneParams } from './dto';
import { Artist } from './entities';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    const artist = this.artistService.findOne(params);
    return artist;
  }

  @Post()
  @ApiBody({ type: [CreateArtistDto] })
  create(@Body() dto: CreateArtistDto): Artist {
    const artist = this.artistService.create(dto);
    return artist;
  }

  @Put(':id')
  @ApiBody({ type: [CreateArtistDto] })
  update(@Param() params: FindOneParams, @Body() dto: CreateArtistDto) {
    this.artistService.update(params, dto);
    const artist = this.artistService.findOne(params);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    this.artistService.remove(params);
  }
}
