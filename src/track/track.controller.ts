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
import { CreateTrackDto, FindOneParams } from './dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  // @Get()
  // getAll(): Track[] {
  //   return this.trackService.findAll();
  // }

  // @Get(':id')
  // getById(@Param() params: FindOneParams) {
  //   const track = this.trackService.findOne(params);
  //   return track;
  // }

  // @Post()
  // create(@Body() dto: CreateTrackDto): Track {
  //   const track = this.trackService.create(dto);
  //   return track;
  // }

  // @Put(':id')
  // update(@Param() params: FindOneParams, @Body() dto: CreateTrackDto) {
  //   this.trackService.update(params, dto);
  //   const track = this.trackService.findOne(params);
  //   return track;
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // delete(@Param() params: FindOneParams) {
  //   this.trackService.remove(params);
  // }
}
