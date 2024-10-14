import { AuthRepository } from '#contracts/repositories/auth_repository'
import { FakeAuthRepository } from '#repositories/auth/fake_auth_repository'
import { LoginUsecase } from '#usecases/auth/login_usecase'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Login usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('token returned', async ({ assert }) => {

    app.container.swap(AuthRepository, () => {
      return new FakeAuthRepository()
    });

    const loginUsecase = await app.container.make(LoginUsecase);

    const data = await loginUsecase.handle({
      uid: 'user@example.com',
      password: 'This is my password'
    });

    assert.equal(data.token, 'token');
  });
});