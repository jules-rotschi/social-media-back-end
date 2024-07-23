import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { User } from "../../entities/user.js";

@inject()
export default class GetUserByIdUsecase {
  constructor(private userRepository: UserRepository) {}

  async handle(id: User["id"]) {
    const user = await this.userRepository.getById(id);
    return user;
  }
}