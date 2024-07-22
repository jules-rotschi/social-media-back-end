import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { User, UserUID } from "#entities/user";

@inject()
export default class LoginUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(uid: UserUID, password: User["password"]) {
    return this.userRepository.login(uid, password);
  }
}