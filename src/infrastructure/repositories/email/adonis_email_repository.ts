import { EmailRepository } from "#contracts/repositories/email_repository";
import { User } from "#entities/user";
import ResetPasswordNotification from "#mails/reset_password_notification";
import mail from "@adonisjs/mail/services/main";

export class AdonisEmailRepository implements EmailRepository {
  async sendResetPasswordConfirmationEmail(user: User): Promise<void> {
    console.log(user);
  }

  async sendValidationEmail(user: User): Promise<void> {
    console.log(user);
  }

  async sendResetPasswordEmail(user: User, url: string): Promise<void> {    
    await mail.send(new ResetPasswordNotification(user, url))
  }
}