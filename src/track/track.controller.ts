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
import { TrackDto, FindOneParams } from './dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    return this.trackService.findOne(params);
  }

  @Post()
  create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: TrackDto) {
    return this.trackService.update(params, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    return this.trackService.remove(params);
  }
}
