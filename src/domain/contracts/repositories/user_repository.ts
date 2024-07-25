import { SignupUserDto } from "#contracts/dto/user/signup_user_dto";
import { User } from "../../entities/user.js";

export abstract class UserRepository {
  abstract create(user: SignupUserDto): Promise<void>;
  abstract getById(id: User["id"]): Promise<User>;
  abstract getByEmail(email: User["email"]): Promise<User | null>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  abstract delete(userId: User["id"]): Promise<void>;
}