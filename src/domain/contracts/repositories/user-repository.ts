import { CreateUserDto } from "#contracts/dto/user/create-user-dto";
import { User } from "../../entities/user.js";

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<void>;
  abstract getById(id: User["id"]): Promise<User>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  abstract delete(userId: User["id"]): Promise<void>;
}