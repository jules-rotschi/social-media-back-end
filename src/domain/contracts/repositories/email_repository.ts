import { User } from "#entities/user";

export abstract class EmailRepository {
  abstract sendValidationEmail(user: User): Promise<void>;
  abstract sendResetPasswordEmail(user: User, url: string): Promise<void>;
  abstract sendResetPasswordConfirmationEmail(user: User): Promise<void>;
}