import { inject } from "@adonisjs/core";
import type { EmailRepository } from "#contracts/repositories/email-repository";
import { User } from "#entities/user";
import { UserRepository } from "#contracts/repositories/user-repository";
import router from "@adonisjs/core/services/router";

@inject()
export default class SendResetPasswordEmailUsecase {

  constructor(
    private userRepository: UserRepository,
    private emailRepository: EmailRepository
  ) {}

  async handle(email: User["email"]) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error("Cet e-mail n'est associé à aucun compte.")
    }

    const signedURL = router
    .builder()
    .prefixUrl('')
    .params({ userId: user.id })
    .makeSigned('reset_password_form', {
      expiresIn: 600000
    });
    
    this.emailRepository.sendResetPasswordEmail(user, signedURL);
  }
}