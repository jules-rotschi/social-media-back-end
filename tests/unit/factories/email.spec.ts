import { EmailFactory } from '#value_objects/email';
import { test } from '@japa/runner'

test.group('User factory', () => {
  test('create an email', async ({ assert }) => {

    const emailString = 'this.is.my.email@example.com';
    const factory = new EmailFactory();
    const createdEmail = factory.create(emailString);

    assert.equal(createdEmail.toString(), 'this.is.my.email@example.com');
  })

  test('bad email', async ({ assert }) => {

    const emailString = 'this.is.my.email.at.example.com';
    const factory = new EmailFactory();
    let createdEmail;
    let emailError;

    try {
      createdEmail = factory.create(emailString);
    } catch(error) {
      emailError = error
    }
    
    assert.equal(emailError.message, 'Format de l\'e-mail invalide');
    assert.isUndefined(createdEmail);
  })
})