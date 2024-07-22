import { CreateUserDto } from "#contracts/dto/user/create-user-dto";
import UserModel from "#models/user";
import { UserRepository } from "../../../domain/contracts/repositories/user-repository.js";
import { User, UserUID } from "../../../domain/entities/user.js";

export class LucidUserRepository implements UserRepository {
  async create(user: CreateUserDto): Promise<void> {
    await UserModel.create(user);
  }

  async getById(id: User["id"]): Promise<User> {
    const user = await UserModel.findOrFail(id);
    return user;
  }

  async update(userId: User["id"], updatedUser: Partial<User>): Promise<void> {
    const user = await UserModel.findOrFail(userId);
    user.merge(updatedUser).save();
  }

  async delete(userId: User["id"]): Promise<void> {
    const user = await UserModel.findOrFail(userId);
    user.delete();
  }

  async login(uid: UserUID, password: User["password"]) {
    const user = await UserModel.verifyCredentials(uid, password);
    const token = await UserModel.accessTokens.create(user);
    return token;
  }
}