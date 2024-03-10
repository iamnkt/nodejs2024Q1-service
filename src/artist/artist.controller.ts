import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist, CreateArtistDto, FindOneParams } from './dto';

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
  create(@Body() dto: CreateArtistDto): Artist {
    const artist = this.artistService.create(dto);
    return artist;
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: CreateArtistDto) {
    this.artistService.update(params, dto);
    const artist = this.artistService.findOne(params);
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params: FindOneParams) {
    this.artistService.remove(params);
  }
}
