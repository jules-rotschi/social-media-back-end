import { SignupUserInputDTO } from "#contracts/dto/user/signup_user_input_dto";
import { AuthRepository } from "#contracts/repositories/auth_repository";
import { UserRepository } from "#contracts/repositories/user_repository";
import { UserFactory } from "#entities/user";
import { inject } from "@adonisjs/core";

@inject()
export class SignupUsecase {

  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository
  ) {}

  async handle(userToSignup: SignupUserInputDTO) {
    const user = new UserFactory().create(userToSignup);
    const createdUser = await this.userRepository.create(user);   
    return {
      user: createdUser,
      token: await this.authRepository.getToken(user.username, user.password)
    }
  }
}