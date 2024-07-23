import { CreateUserDto } from "#contracts/dto/user/create-user-dto";
import UserModel from "#models/user";
import { UserRepository } from "../../../domain/contracts/repositories/user-repository.js";
import { User } from "../../../domain/entities/user.js";

export class LucidUserRepository implements UserRepository {
  async create(user: CreateUserDto): Promise<User> {
    return await UserModel.create(user);
  }
  
  async getById(id: User["id"]): Promise<User> {
    const user = await UserModel.findOrFail(id);
    return user;
  }
  
  async getByUsername(username: User["username"]): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  async getByEmail(email: User["email"]): Promise<User> {
    return await UserModel.findByOrFail('email', email);
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