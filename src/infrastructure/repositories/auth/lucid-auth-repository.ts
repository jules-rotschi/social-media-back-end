import { AuthRepository } from "#contracts/repositories/auth-repository";
import { UserUID, User } from "#entities/user";
import UserModel from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export class LucidAuthRepository implements AuthRepository {
  async login(uid: UserUID, password: User["password"]): Promise<AccessToken> {
    const user = await UserModel.verifyCredentials(uid, password);
    let existingTokens = await UserModel.accessTokens.all(user)
    
    while (existingTokens.length) {
      await UserModel.accessTokens.delete(user, existingTokens[0].identifier);
      existingTokens = await UserModel.accessTokens.all(user)
    }

    const token = await UserModel.accessTokens.create(user);    
    return token;
  }
}