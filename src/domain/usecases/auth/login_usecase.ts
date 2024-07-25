import { inject } from "@adonisjs/core";
import { AuthRepository } from "#contracts/repositories/auth_repository";
import { LoginUserDto } from "#contracts/dto/user/login_user_dto";

@inject()
export class LoginUsecase {

  constructor(private authRepository: AuthRepository) {}

  async handle(user: LoginUserDto) {
    return this.authRepository.getToken(user.uid, user.password);
  }
}