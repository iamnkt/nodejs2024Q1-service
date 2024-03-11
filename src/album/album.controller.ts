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
import { AlbumService } from './album.service';
import { CreateAlbumDto, FindOneParams } from './dto';
import { Album } from './entities';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    const artist = this.albumService.findOne(params);
    return artist;
  }

  @Post()
  @ApiBody({ type: [CreateAlbumDto] })
  create(@Body() dto: CreateAlbumDto): Album {
    const album = this.albumService.create(dto);
    return album;
  }

  @Put(':id')
  @ApiBody({ type: [CreateAlbumDto] })
  update(@Param() params: FindOneParams, @Body() dto: CreateAlbumDto) {
    this.albumService.update(params, dto);
    const album = this.albumService.findOne(params);
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    this.albumService.remove(params);
  }
}
