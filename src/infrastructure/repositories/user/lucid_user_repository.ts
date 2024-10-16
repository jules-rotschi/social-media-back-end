import UserModel from "#models/user";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository.js";
import { User, UserFactory } from "#entities/user";
import { Email, EmailFactory } from "#value_objects/email";

export class LucidUserRepository implements UserRepository {
  async create(user: User) {

    const ludicUser = {
      ...user,
      email: user.email.toString(),
    }
    const createdUser = await UserModel.create(ludicUser);

    const userToReturn = new User(
      createdUser.username,
      new EmailFactory().create(createdUser.email),
      createdUser.fullName,
      createdUser.password
    );
    userToReturn.id = createdUser.id;
    userToReturn.description = createdUser.description ?? undefined;
    userToReturn.picture = createdUser.picture ?? undefined;

    return userToReturn;
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

  async update(userId: User["id"], userModifications: Partial<User>) {
    const user = await UserModel.findOrFail(userId);
    const updatedUser = await user.merge(userModifications).save();

    const userToReturn = new User(
      updatedUser.username,
      new EmailFactory().create(updatedUser.email),
      updatedUser.fullName,
      updatedUser.password
    );
    userToReturn.id = updatedUser.id;
    userToReturn.description = updatedUser.description ?? undefined;
    userToReturn.picture = updatedUser.picture ?? undefined;
    
    return userToReturn;
  }

  // async delete(userId: User["id"]): Promise<void> {
  //   const user = await UserModel.findOrFail(userId);
  //   user.delete();
  // }
}