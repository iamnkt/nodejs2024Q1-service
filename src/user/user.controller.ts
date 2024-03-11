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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, FindOneParams, UpdatePasswordDto } from './dto';
import { User } from './entites';
import { UserService } from './user.service';

@ApiTags('user')
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
  @ApiBody({ type: [CreateUserDto] })
  create(@Body() dto: CreateUserDto): User {
    const user = this.userService.create(dto);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiBody({ type: [UpdatePasswordDto] })
  update(@Param() params: FindOneParams, @Body() dto: UpdatePasswordDto) {
    this.userService.update(params, dto);
    const user = this.userService.findOne(params);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindOneParams) {
    this.userService.remove(params);
  }
}
