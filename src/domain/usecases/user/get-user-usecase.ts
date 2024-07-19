import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { UserEntity } from "../../entities/user.js";

@inject()
export default class GetUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async handle(id: UserEntity["id"]) {
    const user = await this.userRepository.getById(id);
    return user;
  }
}