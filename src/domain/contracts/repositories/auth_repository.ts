import { User, UserUID } from "#entities/user";

export abstract class AuthRepository {
  abstract getToken(uid: UserUID, password: User["password"]): Promise<string>;
}