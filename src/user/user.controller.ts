import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/interfaces/interfaces';
import { CreateUserDto, FindOneParams, UpdatePasswordDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {};

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    const user = this.userService.findOne(params);
    return user;
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): User {
    const user = this.userService.create(dto);
    return user;
  }

  @Put(':id')
  updateUser(@Param() params: FindOneParams, @Body() dto: UpdatePasswordDto) {
    this.userService.update(params, dto);
    const user = this.userService.findOne(params);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params: FindOneParams) {
    this.userService.remove(params);
  }
}
