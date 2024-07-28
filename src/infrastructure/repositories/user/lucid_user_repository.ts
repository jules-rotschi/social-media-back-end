import UserModel from "#models/user";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository.js";
import { User, UserFactory } from "#entities/user";
import { Email } from "#value_objects/email";

export class LucidUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const ludicUser = {
      ...user,
      email: user.email.toString(),
    } 
    await UserModel.create(ludicUser);
  }
  
  // async getById(id: User["id"]): Promise<User> {
  //   const user = await UserModel.findOrFail(id);
  //   return user;
  // }
  
  async getByEmail(email: Email): Promise<User | null> {
    const lucidUser = await UserModel.findBy('email', email.toString());

    if (!lucidUser) {
      return null
    }

    const user = {
      id: lucidUser.id,
      username: lucidUser.username,
      email: lucidUser.email,
      fullName: lucidUser.fullName,
      password: lucidUser.password,
      description: lucidUser.description || undefined,
      picture: lucidUser.picture || undefined
    };

    return new UserFactory().create(user);
  }

  async update(userId: User["id"], updatedUser: Partial<User>): Promise<void> {
    const user = await UserModel.findOrFail(userId);
    return await user.merge(updatedUser).save();    
  }

  // async delete(userId: User["id"]): Promise<void> {
  //   const user = await UserModel.findOrFail(userId);
  //   user.delete();
  // }
}