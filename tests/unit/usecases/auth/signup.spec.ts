import { AuthRepository } from '#contracts/repositories/auth_repository'
import { UserRepository } from '#contracts/repositories/user_repository'
import { FakeAuthRepository } from '#repositories/auth/fake_auth_repository'
import { FakeUserRepository } from '#repositories/user/fake_user_repository'
import { SignupUsecase } from '#usecases/auth/signup_usecase'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Signup usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('token returned', async ({ assert }) => {

    app.container.swap(UserRepository, () => {
      return new FakeUserRepository()
    });

    app.container.swap(AuthRepository, () => {
      return new FakeAuthRepository()
    });

    const signupUsecase = await app.container.make(SignupUsecase);

    const data = await signupUsecase.handle({
      username: 'user',
      email: 'user@example.com',
      fullName: 'User',
      password: 'This is my password'
    });

    assert.equal(data.token, 'token');
  });
});