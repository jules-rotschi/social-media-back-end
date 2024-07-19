import UserModel from "#models/user";
import { UserRepository } from "../../../domain/contracts/repositories/user-repository.js";
import { User } from "../../../domain/entities/user.js";

export class LucidUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const createdUser = await UserModel.create(user);
    console.log(createdUser);
    
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
}