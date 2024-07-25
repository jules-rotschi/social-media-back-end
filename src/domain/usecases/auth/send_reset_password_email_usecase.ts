import { inject } from "@adonisjs/core";
import { EmailRepository } from "#contracts/repositories/email_repository";
import { User } from "#entities/user";
import { UserRepository } from "#contracts/repositories/user_repository";
import router from "@adonisjs/core/services/router";
import RowNotFoundException from "#exceptions/row_not_found_exception";

@inject()
export class SendResetPasswordEmailUsecase {

  constructor(
    private userRepository: UserRepository,
    private emailRepository: EmailRepository
  ) {}

  async handle(email: User["email"]) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new RowNotFoundException("Cet e-mail n'est associé à aucun compte.")
    }

    const signedURL = router
      .builder()
      .prefixUrl('http://localhost:3333')
      .params([user.id])
      .makeSigned('auth.getResetPasswordForm', {
        expiresIn: 600000
      });
    
    this.emailRepository.sendResetPasswordEmail(user, signedURL);
  }
}