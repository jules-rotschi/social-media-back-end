import { SignupUserDto } from "#contracts/dto/user/signup_user_dto";
import { AuthRepository } from "#contracts/repositories/auth_repository";
import { UserRepository } from "#contracts/repositories/user_repository";
import { inject } from "@adonisjs/core";

@inject()
export class SignupUsecase {

  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository
  ) {}

  async handle(user: SignupUserDto) {
    await this.userRepository.create(user);
    return await this.authRepository.getToken(user.username, user.password);
  }
}