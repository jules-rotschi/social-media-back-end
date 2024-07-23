import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { User } from "#entities/user";

@inject()
export default class UpdateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async handle(userId: User["id"], updatedUser: Partial<User>) {
    await this.userRepository.update(userId, updatedUser);
  }
}