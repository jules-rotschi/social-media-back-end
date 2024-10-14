import { UserRepository } from "#contracts/repositories/user_repository";
import { User } from "#entities/user";
import { Email } from "#value_objects/email";

export class FakeUserRepository implements UserRepository {
  create() {
    return Promise.resolve();
  }

  getByEmail(email: Email) {
    const user = new User(
      'created-user',
      email,
      'Created User',
      'This is my password'
    )
    return Promise.resolve(user);
  }

  update() {
    return Promise.resolve();
  }
}