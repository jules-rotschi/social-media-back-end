import ResetPasswordNotification from '#mails/reset_password_notification';
import mail from '@adonisjs/mail/services/main';
import { test } from '@japa/runner'

test.group('Forgotten password', () => {

  test('unknown e-mail', async ({ client, cleanup }) => {

    const { mails } = mail.fake();
    cleanup(() => mail.restore());

    const email = 'jane@example.com'

    const response = await client.post("/forgotten-password").json({
      data: { email }
    });
    response.assertStatus(200);

    mails.assertNotSent(ResetPasswordNotification);
  })

  test('sent e-mail', async ({ client, cleanup }) => {

    const { mails } = mail.fake();
    cleanup(() => mail.restore());

    const email = 'jules.rotschi@example.com';

    const response = await client.post("/forgotten-password").json({
      data: { email }
    });
    response.assertStatus(200);

    mails.assertSent(ResetPasswordNotification);
  })
})