import ResetPasswordNotification from '#mails/reset_password_notification';
import mail from '@adonisjs/mail/services/main';
import { test } from '@japa/runner'

test.group('Forgotten password', (group) => {

  group.each.teardown(async () => {
    mail.restore();
  })

  test('unknown e-mail', async ({ client }) => {

    const { mails } = mail.fake();

    const email = 'jane@example.com'

    const response = await client.post("/forgotten-password").json({
      data: { email }
    });
    response.assertStatus(200);

    mails.assertNotSent(ResetPasswordNotification);
  })

  test('sent e-mail', async ({ client }) => {

    const { mails } = mail.fake();

    const email = 'jane@example.com'

    const response = await client.post("/forgotten-password").json({
      data: { email }
    });
    response.assertStatus(200);

    mails.assertSent(ResetPasswordNotification, ({ message }) => {
      message.assertTo(email);
      message.assertFrom('support@julesrotschi.fr');
      message.assertSubject('Réinitialisation de votre mot de passe');
      return true;
    });
  })
})