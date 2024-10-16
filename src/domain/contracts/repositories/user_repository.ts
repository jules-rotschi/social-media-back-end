import { User } from "#entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  // abstract getById(id: number): Promise<User>;
  abstract getByEmail(email: User["email"]): Promise<User | null>;
  abstract update(userId: User["id"], userModifications: Partial<User>): Promise<User>;
  // abstract delete(userId: User["id"]): Promise<void>;
}