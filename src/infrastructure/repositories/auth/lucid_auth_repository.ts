import { AuthRepository } from "#contracts/repositories/auth_repository";
import { UserUID, User } from "#entities/user";
import UserModel from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export class LucidAuthRepository implements AuthRepository {
  async getToken(uid: UserUID, password: User["password"]): Promise<AccessToken> {
    const user = await UserModel.verifyCredentials(uid, password);

    let existingTokens = await UserModel.accessTokens.all(user)
    while (existingTokens.length) {
      await UserModel.accessTokens.delete(user, existingTokens[0].identifier);
      existingTokens = await UserModel.accessTokens.all(user)
    }

    return await UserModel.accessTokens.create(user);    
  }
}