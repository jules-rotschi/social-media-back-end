import { AuthRepository } from "#contracts/repositories/auth_repository";

export class FakeAuthRepository implements AuthRepository {
  getToken() {
    return Promise.resolve('token');
  }
}