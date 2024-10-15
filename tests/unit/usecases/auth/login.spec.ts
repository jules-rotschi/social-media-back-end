import { AuthRepository } from '#contracts/repositories/auth_repository'
import { InMemoryAuthRepository } from '#repositories/auth/in_memory_auth_repository'
import { LoginUsecase } from '#usecases/auth/login_usecase'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { mockDatabase } from '../../../../src/infrastructure/mock/db.js'
import { EmailFactory } from '#value_objects/email'

test.group('Login usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('token returned', async ({ assert }) => {

    app.container.swap(AuthRepository, () => {
      return new InMemoryAuthRepository()
    });

    const loginUsecase = await app.container.make(LoginUsecase);

    mockDatabase.users.push({
      id: 1,
      username: 'user',
      email: new EmailFactory().create('user@example.com'),
      fullName: 'User',
      password: 'This is my password'
    });

    const data = await loginUsecase.handle({
      uid: 'user@example.com',
      password: 'This is my password'
    });

    assert.equal(data.token, 'token-for-user');
  });

  test('no token returned', async ({ assert }) => {

    app.container.swap(AuthRepository, () => {
      return new InMemoryAuthRepository()
    });

    const loginUsecase = await app.container.make(LoginUsecase);

    const data = await loginUsecase.handle({
      uid: 'user@example.com',
      password: 'Wrong password'
    });

    assert.equal(data.token, '');
  });
});