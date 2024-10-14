import { inject } from "@adonisjs/core";
// import { EmailRepository } from "#contracts/repositories/email_repository";
import { UserRepository } from "#contracts/repositories/user_repository";
import { EmailFactory } from "#value_objects/email";
import { UrlRepository } from "#contracts/repositories/url_repository";

@inject()
export class ForgottenPasswordUsecase {

  constructor(
    private userRepository: UserRepository,
    // private emailRepository: EmailRepository,
    private urlRepository: UrlRepository
  ) {}

  async handle(email: string) {
    const emailFactory = new EmailFactory();
    const userEmail = emailFactory.create(email);
    const user = await this.userRepository.getByEmail(userEmail)
    
    if (!user) return;

    const signedUrl =
      this.urlRepository.getSignedUrl(
        'http://localhost:3333',
        [user.id],
        'auth.getResetPasswordForm',
        600000
      );

    return signedUrl;
    
    // this.emailRepository.sendResetPasswordEmail(user, signedURL);
  }
}