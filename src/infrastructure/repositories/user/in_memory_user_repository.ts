import { UserRepository } from "#contracts/repositories/user_repository";
import { User } from "#entities/user";
import { mockDatabase } from "../../mock/db.js";

export class InMemoryUserRepository implements UserRepository {
  create(user: User) {
    user.id = mockDatabase.users.length;
    mockDatabase.users.push(user);
    return Promise.resolve(user);
  }

  getByEmail(email: User['email']) {
    const user = mockDatabase.users.find((user) => user.email === email) ?? null;
    return Promise.resolve(user);
  }

  update(userId: User["id"], updatedUser: Partial<User>) {
    const user = mockDatabase.users.find((user) => user.id === userId);
    if (!user || !user.id) throw new Error();
    const userIndex = mockDatabase.users.indexOf(user);
    mockDatabase.users[userIndex] = { ...user, ...updatedUser }
    return Promise.resolve(mockDatabase.users[userIndex]);
  }
}