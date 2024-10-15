import { AuthRepository } from "#contracts/repositories/auth_repository";
import { User, UserUID } from "#entities/user";
import { Email } from "#value_objects/email";
import { mockDatabase } from "../../mock/db.js";

export class InMemoryAuthRepository implements AuthRepository {
  getToken(uid: UserUID, password: User["password"]) {

    if (uid instanceof Email) {
      uid = uid.toString();
    }

    const user = mockDatabase.users.find(
      (user) => user.username === uid || user.email.toString() === uid
    );

    const isPasswordCorrect = user?.password === password;

    if (!isPasswordCorrect) return Promise.resolve('');

    return Promise.resolve('token-for-' + user.username);
  }
}