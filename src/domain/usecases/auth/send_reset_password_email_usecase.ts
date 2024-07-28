import { inject } from "@adonisjs/core";
import { EmailRepository } from "#contracts/repositories/email_repository";
import { UserRepository } from "#contracts/repositories/user_repository";
import router from "@adonisjs/core/services/router";
import { EmailFactory } from "#value_objects/email";
import DomainException from "#exceptions/domain_exception";

@inject()
export class SendResetPasswordEmailUsecase {

  constructor(
    private userRepository: UserRepository,
    private emailRepository: EmailRepository
  ) {}

  async handle(email: string) {
    const emailFactory = new EmailFactory();
    const userEmail = emailFactory.create(email);
    const user = await this.userRepository.getByEmail(userEmail)
    
    if (!user) {
      throw new DomainException("Cet e-mail n'est associé à aucun compte", { status: 404 });
    }

    const signedURL = router
      .builder()
      .prefixUrl('http://localhost:3333')
      .params([user.id])
      .makeSigned('auth.getResetPasswordForm', {
        expiresIn: 600000
      });

    return signedURL;
    
    // this.emailRepository.sendResetPasswordEmail(user, signedURL);
  }
}