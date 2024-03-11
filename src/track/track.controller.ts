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
import { CreateTrackDto, FindOneParams } from './dto';
import { Track } from './entites';
import { TrackService } from './track.service';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    const track = this.trackService.findOne(params);
    return track;
  }

  @Post()
  @ApiBody({ type: [CreateTrackDto] })
  create(@Body() dto: CreateTrackDto): Track {
    const track = this.trackService.create(dto);
    return track;
  }

  @Put(':id')
  @ApiBody({ type: [CreateTrackDto] })
  update(@Param() params: FindOneParams, @Body() dto: CreateTrackDto) {
    this.trackService.update(params, dto);
    const track = this.trackService.findOne(params);
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    this.trackService.remove(params);
  }
}
