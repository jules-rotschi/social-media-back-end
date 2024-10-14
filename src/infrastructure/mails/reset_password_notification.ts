import { User } from '#entities/user';
import { BaseMail } from '@adonisjs/mail'

export default class ResetPasswordNotification extends BaseMail {

  constructor(
    private user: User,
    private url: string
  ) {
    super();
  }

  from = 'support@julesrotschi.fr'
  subject = 'Réinitialisation de votre mot de passe'

  prepare() {
    this.message.htmlView('emails/forgotten_password', { user: this.user, url: this.url })
    this.message
      .from(this.from)
      .to(this.user.email.toString())
      .subject(this.subject)
      .htmlView('emails/forgotten_password', { user: this.user, url: this.url });
  }
}