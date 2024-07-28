import { User } from "#entities/user";
import { Email } from "#value_objects/email";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  // abstract getById(id: number): Promise<User>;
  abstract getByEmail(email: Email): Promise<User | null>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  // abstract delete(userId: User["id"]): Promise<void>;
}