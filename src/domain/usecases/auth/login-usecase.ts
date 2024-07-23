import { inject } from "@adonisjs/core";
import { User, UserUID } from "#entities/user";
import { AuthRepository } from "#contracts/repositories/auth-repository";

@inject()
export default class LoginUsecase {

  constructor(private authRepository: AuthRepository) {}

  async handle(uid: UserUID, password: User["password"]) {
    return this.authRepository.login(uid, password);
  }
}