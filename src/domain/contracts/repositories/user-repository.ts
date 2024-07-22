import { CreateUserDto } from "#contracts/dto/user/create-user-dto";
import { AccessToken } from "@adonisjs/auth/access_tokens";
import { User, UserUID } from "../../entities/user.js";

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<void>;
  abstract getById(id: User["id"]): Promise<User>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  abstract delete(userId: User["id"]): Promise<void>;
  abstract login(uid: UserUID, password: User["password"]): Promise<AccessToken>;
}