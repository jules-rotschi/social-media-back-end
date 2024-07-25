import { db } from "#database/in_memory_db";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository.js";
import { User } from "../../../domain/entities/user.js";

export class InMemoryUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    db.users.push(user);
  }
  
  async getById(id: User["id"]): Promise<User> {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User does not exist");
    }
    return user;
  }

  getByEmail(email: User["email"]): Promise<User | null> {
    throw new Error("Method not implemented. E-mail: " + email);
  }

  async update(userId: User["id"], updatedUser: Partial<User>): Promise<void> {
    const user = db.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    const index = db.users.indexOf(user);
    db.users.splice(index, 1, {...user, ...updatedUser});
  }

  async delete(userId: User["id"]): Promise<void> {
    const user = db.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    const index = db.users.indexOf(user);
    db.users.splice(index, 1);
  }
}