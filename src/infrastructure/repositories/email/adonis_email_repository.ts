import { EmailRepository } from "#contracts/repositories/email_repository";
import { User } from "#entities/user";
import mail from "@adonisjs/mail/services/main";

export class AdonisEmailRepository implements EmailRepository {
  async sendResetPasswordConfirmationEmail(user: User): Promise<void> {
    console.log(user);
  }

  async sendValidationEmail(user: User): Promise<void> {
    console.log(user);
  }

  async sendResetPasswordEmail(user: User, url: string): Promise<void> {
    await mail.send((message) => {
      message
        .to(user.email)
        .from('support@jules-rotschi.com')
        .subject('Réinitialisation de votre mot de passe')
        .htmlView('emails/forgotten_password', { user, url })
    })
  }
}