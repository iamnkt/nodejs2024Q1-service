import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { db } from 'src/db/db';
import { CreateUserDto, UpdatePasswordDto, User } from './dto';

@Injectable()
export class UserService {
  create(dto: CreateUserDto): User {
    const user = new User({
      id: crypto.randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    db.createUser(user);

    return user;
  }

  findAll(): User[] {
    const users = db.getUsers();
    return users;
  }
  
  findOne(params: { id: UUID }) {
    const user = db.getUser(params.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  update(params: { id: UUID }, dto: UpdatePasswordDto) {
    const userToUpdate = db.getUser(params.id);
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (userToUpdate.password !== dto.oldPassword) {
      throw new HttpException(
        'User provided incorrect old password',
        HttpStatus.FORBIDDEN,
      );
    } else {
      db.updatePassword(params.id, dto);
    }
  }

  remove(params: { id: UUID }) {
    const userToDelete = db.getUser(params.id);
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      db.deleteUser(params.id);
    }
  }
}
