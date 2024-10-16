import { AuthRepository } from '#contracts/repositories/auth_repository'
import { UserRepository } from '#contracts/repositories/user_repository'
import { InMemoryAuthRepository } from '#repositories/auth/in_memory_auth_repository'
import { InMemoryUserRepository } from '#repositories/user/in_memory_user_repository'
import { SignupUsecase } from '#usecases/auth/signup_usecase'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Signup usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('token returned', async ({ assert }) => {

    app.container.swap(UserRepository, () => {
      return new InMemoryUserRepository()
    });

    app.container.swap(AuthRepository, () => {
      return new InMemoryAuthRepository()
    });

    const signupUsecase = await app.container.make(SignupUsecase);

    const data = await signupUsecase.handle({
      username: 'user',
      email: 'user@example.com',
      fullName: 'User',
      password: 'This is my password'
    });

    assert.equal(data.token, 'token-for-user');
  });
});