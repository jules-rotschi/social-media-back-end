import { User, UserUID } from "#entities/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export abstract class AuthRepository {
  abstract login(uid: UserUID, password: User["password"]): Promise<AccessToken>;
}