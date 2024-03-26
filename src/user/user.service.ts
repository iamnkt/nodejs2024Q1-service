import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateUserDto) {
    const userData = {
      id: crypto.randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return this.databaseService.user.create({
      data: userData,
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({});
  }

  async findOne(params: { id: UUID }) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(params: { id: UUID }, dto: UpdatePasswordDto) {
    const userToUpdate = await this.databaseService.user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (userToUpdate.password !== dto.oldPassword) {
      throw new HttpException(
        'User provided incorrect old password',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return await this.databaseService.user.update({
        where: {
          id: params.id,
        },
        data: {
          password: dto.newPassword,
          version: userToUpdate.version + 1,
          updatedAt: Date.now(),
        },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }
  }

  async remove(params: { id: UUID }) {
    const userToDelete = await this.databaseService.user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return await this.databaseService.user.delete({
        where: { id: params.id },
      });
    }
  }
}
