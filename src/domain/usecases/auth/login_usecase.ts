import { inject } from "@adonisjs/core";
import { AuthRepository } from "#contracts/repositories/auth_repository";
import { LoginUserInputDTO } from "#contracts/dto/user/login_user_input_dto";
import { TokenOutputDTO } from "#contracts/dto/auth/token_output_dto";

@inject()
export class LoginUsecase {

  constructor(private authRepository: AuthRepository) {}

  async handle(user: LoginUserInputDTO): Promise<TokenOutputDTO> {
    return {
      token: await this.authRepository.getToken(user.uid, user.password)
    };
  }
}