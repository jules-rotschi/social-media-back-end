import { User } from '#entities/user'
import ResetPasswordNotification from '#mails/reset_password_notification'
import { EmailFactory } from '#value_objects/email'
import { test } from '@japa/runner'

test.group('Reset password email', () => {
  test('prepare email for sending', async () => {

    const user: User = {
      username: 'user',
      email: new EmailFactory().create('user@example.com'),
      fullName: 'User',
      password: 'Password'
    };

    const email = new ResetPasswordNotification(user, 'url-to-reset-password');

    await email.buildWithContents();

    email.message.assertTo('user@example.com');
    email.message.assertFrom('support@julesrotschi.fr');
    email.message.assertSubject('Réinitialisation de votre mot de passe');
    email.message.assertHtmlIncludes(
      `<a href="url-to-reset-password">définir un nouveau mot de passe</a>`
    );
    email.message.assertHtmlIncludes('User, vous avez demandé');
    email.message.assertHtmlIncludes('votre mot de passe Social Media (user)');
  })
})