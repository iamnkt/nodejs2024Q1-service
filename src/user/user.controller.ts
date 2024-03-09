import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, FindOneParams, UpdatePasswordDto, User } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param() params: FindOneParams) {
    const user = this.userService.findOne(params);
    return user;
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() dto: CreateUserDto): User {
    const user = this.userService.create(dto);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param() params: FindOneParams, @Body() dto: UpdatePasswordDto) {
    this.userService.update(params, dto);
    const user = this.userService.findOne(params);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params: FindOneParams) {
    this.userService.remove(params);
  }
}
