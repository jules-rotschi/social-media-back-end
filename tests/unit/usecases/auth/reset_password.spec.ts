import { UserRepository } from '#contracts/repositories/user_repository';
import { FakeUserRepository } from '#repositories/user/fake_user_repository';
import { ResetPasswordUsecase } from '#usecases/auth/reset_password_usecase';
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Reset password usecase', (group) => {

  group.teardown(async () => {
    app.container.restoreAll();
  });

  test('updated user', async ({ assert }) => {
    app.container.swap(UserRepository, () => {
      return new FakeUserRepository()
    });

    const resetPasswordusecase = await app.container.make(ResetPasswordUsecase);
    await resetPasswordusecase.handle(1, 'This is my password');

    // assert.equal(mock.users.find((u) => u.id === 1).password, 'This is my password');
  });
});