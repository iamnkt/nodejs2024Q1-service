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
import { AlbumService } from './album.service';
import { AlbumDto, FindOneParams } from './dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    return this.albumService.findOne(params);
  }

  @Post()
  create(@Body() dto: AlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: AlbumDto) {
    return this.albumService.update(params, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    return this.albumService.remove(params);
  }
}
