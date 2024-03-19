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
import { ArtistService } from './artist.service';
import { ArtistDto, FindOneParams } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    return this.artistService.findOne(params);
  }

  @Post()
  create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: ArtistDto) {
    return this.artistService.update(params, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    return this.artistService.remove(params);
  }
}
