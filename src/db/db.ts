import { UUID } from 'crypto';
import { UpdatePasswordDto, User } from 'src/user/dto';

export interface DataStorage {
  users: User[];
}

class DataBase {
  dataStorage: DataStorage;

  constructor() {
    this.dataStorage = {
      users: [],
    };
  }

  public getUsers() {
    return this.dataStorage.users;
  }

  public createUser(user: User) {
    this.dataStorage.users.push(user);
  }

  public getUser(id: UUID) {
    const user = this.dataStorage.users.find((user) => user.id === id);
    return user;
  }

  public updatePassword(id: UUID, dto: UpdatePasswordDto) {
    this.dataStorage.users.forEach((user) => {
      if (user.id === id) {
        user.password = dto.newPassword;
        user.updatedAt = Date.now();
        user.version += 1;
      }
    });
  }

  public deleteUser(id: UUID) {
    const newStorage = this.dataStorage.users.filter((user) => user.id !== id);
    this.dataStorage.users = newStorage;
  }
}

const db = new DataBase();

export { db };
