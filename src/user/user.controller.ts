import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, FindOneParams, UpdatePasswordDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    return this.userService.findOne(params);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: UpdatePasswordDto) {
    return this.userService.update(params, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    return this.userService.remove(params);
  }
}
