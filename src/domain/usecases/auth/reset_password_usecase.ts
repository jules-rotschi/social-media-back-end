import { UserRepository } from "#contracts/repositories/user_repository";
import { inject } from "@adonisjs/core";

@inject()
export class ResetPasswordUsecase {

  constructor(private userRepository: UserRepository) {}

  async handle(userId: number, password: string) {
    await this.userRepository.update(userId, { password })
  }
}