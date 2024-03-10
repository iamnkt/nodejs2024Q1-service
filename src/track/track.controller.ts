import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FindOneParams, Track } from './dto';
import { TrackService } from './track.service';

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
  
  // @Post()
  // create(@Body() dto: CreateUserDto): User {
  //   const user = this.userService.create(dto);
  //   return user;
  // }

  // @Put(':id')
  // update(@Param() params: FindOneParams, @Body() dto: UpdatePasswordDto) {
  //   this.userService.update(params, dto);
  //   const user = this.userService.findOne(params);
  //   return user;
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // delete(@Param() params: FindOneParams) {
  //   this.userService.remove(params);
  // }
}
