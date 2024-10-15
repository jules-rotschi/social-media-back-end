import { UserFactory } from '#entities/user'
import { test } from '@japa/runner'

test.group('User factory', () => {
  test('create a user', async ({ assert }) => {
    const user = {
      id: 2003,
      username: 'a_new_user',
      email: 'new.user@example.com',
      fullName: 'New user',
      password: 'This is my password'
    }
    
    const factory = new UserFactory();

    const createdUser = factory.create(user);

    assert.equal(createdUser.id, 2003);
    assert.equal(createdUser.username, 'a_new_user');
    assert.equal(createdUser.email.toString(), 'new.user@example.com');
    assert.equal(createdUser.fullName, 'New user');
    assert.equal(createdUser.password, 'This is my password');
  })
})