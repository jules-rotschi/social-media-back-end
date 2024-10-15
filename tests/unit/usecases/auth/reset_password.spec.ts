import { UserRepository } from '#contracts/repositories/user_repository';
import { InMemoryUserRepository } from '#repositories/user/in_memory_user_repository';
import { ResetPasswordUsecase } from '#usecases/auth/reset_password_usecase';
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { mockDatabase } from '../../../../src/infrastructure/mock/db.js';
import { EmailFactory } from '#value_objects/email';

test.group('Reset password usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('updated user', async ({ assert }) => {
    app.container.swap(UserRepository, () => {
      return new InMemoryUserRepository()
    });

    const resetPasswordusecase = await app.container.make(ResetPasswordUsecase);

    mockDatabase.users.push({
      id: 2812,
      username: 'user',
      email: new EmailFactory().create('user@example.com'),
      fullName: 'User',
      password: 'This is my old password'
    });

    await resetPasswordusecase.handle(2812, 'This is my password');

    assert.equal(mockDatabase.users.find((u) => u.id === 2812)?.password, 'This is my password');
  });
});