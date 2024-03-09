import { UUID } from "crypto";
import { DataStorage, User } from "src/interfaces/interfaces";
import { UpdatePasswordDto } from "src/user/dto";

class DataBase {
  dataStorage: DataStorage;

  constructor() {
    this.dataStorage = {
      users: []
    };
  }

  public getUsers() {
    return this.dataStorage.users;
  }

  public createUser(user: User) {
    this.dataStorage.users.push(user);
  }

  public getUser(id: UUID) {
    const user = this.dataStorage.users.find(user => user.id === id);
    return user;
  }

  public updatePassword(id: UUID, dto: UpdatePasswordDto) {
    this.dataStorage.users.forEach((user) => {
      if (user.id === id) {
        user.password = dto.newPassword;
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
