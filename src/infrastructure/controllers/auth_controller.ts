import CreateUserUsecase from "#usecases/user/create-user-usecase";
import LoginUsecase from "#usecases/auth/login-usecase";
import SendResetPasswordEmailUsecase from "#usecases/auth/send-reset-password-email-usecase";
import { createUserValidator } from "#validators/user-validators";
import { HttpContext } from "@adonisjs/core/http";
import { loginValidator, sendResetPasswordEmailValidator } from "#validators/auth-validators";
import { inject } from "@adonisjs/core";
import UpdateUserUsecase from "#usecases/user/update-user-usecase";

@inject()
export default class AuthController {

  constructor(
    private createUserUsecase: CreateUserUsecase,
    private loginUsecase: LoginUsecase,
    private sendResetPasswordEmailUsecase: SendResetPasswordEmailUsecase,
    private updateUserUsecase: UpdateUserUsecase
  ) {}

  async signup({ request }: HttpContext) {
    const data = request.only(["user"]).user;
    const payload = await createUserValidator.validate(data);
    const user = await this.createUserUsecase.handle(payload);
    return this.loginUsecase.handle(user.username, user.password);
  }

  async login({ request }: HttpContext) {
    const data = request.only(['uid', 'password']);
    const payload = await loginValidator.validate(data);
    return await this.loginUsecase.handle(payload.uid, payload.password);
  }

  async sendResetPasswordEmail({ request }: HttpContext) {
    const data = request.only(["email"]);
    const { email } = await sendResetPasswordEmailValidator.validate(data);
    this.sendResetPasswordEmailUsecase.handle(email);
  }

  async resetPasswordForm({ request, response, view }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL')
    }
    const userId = request.params().userId;
    view.render('reset-password-form', { userId });
  }

  async resetPassword({ request, response }: HttpContext) {
    const data = request.only(['userId', 'password', 'passwordConfirmation']);
    const payload = data;
    await this.updateUserUsecase.handle(
      payload.userId,
      payload.password
    );
    response.redirect().toRoute('password-successfully-reset');
  }
}