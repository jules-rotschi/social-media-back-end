import { AuthRepository } from "#contracts/repositories/auth_repository";
import { UserUID, User } from "#entities/user";
import UserModel from "#models/user";
import { Email } from "#value_objects/email";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export class LucidAuthRepository implements AuthRepository {
  async getToken(uid: UserUID, password: User["password"]): Promise<string> {

    if (uid instanceof Email) {
      uid = uid.toString();
    }

    const user = await UserModel.verifyCredentials(uid, password);

    let existingTokens = await UserModel.accessTokens.all(user)
    while (existingTokens.length) {
      await UserModel.accessTokens.delete(user, existingTokens[0].identifier);
      existingTokens = await UserModel.accessTokens.all(user)
    }

    const lucidToken: AccessToken = await UserModel.accessTokens.create(user);
    const tokenString = lucidToken.toJSON().token;

    if (tokenString) {
      return tokenString;
    }

    throw new Error("No token after authentication");
  }
}