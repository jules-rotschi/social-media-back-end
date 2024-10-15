import { User } from "#entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  // abstract getById(id: number): Promise<User>;
  abstract getByEmail(email: User["email"]): Promise<User | null>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  // abstract delete(userId: User["id"]): Promise<void>;
}