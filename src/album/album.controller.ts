import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  // @Get()
  // getAll(): User[] {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // getById(@Param() params: FindOneParams) {
  //   const user = this.userService.findOne(params);
  //   return user;
  // }
  
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post()
  // create(@Body() dto: CreateUserDto): User {
  //   const user = this.userService.create(dto);
  //   return user;
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
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
