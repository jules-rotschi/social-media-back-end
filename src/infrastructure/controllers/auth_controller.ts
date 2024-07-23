import CreateUserUsecase from "#usecases/user/create-user-usecase";
import LoginUsecase from "#usecases/auth/login-usecase";
import SendResetPasswordEmailUsecase from "#usecases/auth/send-reset-password-email-usecase";
import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import UpdateUserUsecase from "#usecases/user/update-user-usecase";
import { signupValidator } from "#validators/signup-validator";
import { loginValidator } from "#validators/login-validator";
import { sendResetPasswordEmailValidator } from "#validators/send-reset-password-email-validator";
import { resetPasswordValidator } from "#validators/reset-password-validator";

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
    const payload = await signupValidator.validate(data);
    await this.createUserUsecase.handle(payload);
    return await this.loginUsecase.handle(payload.username, payload.password);
  }

  async login({ request }: HttpContext) {
    const data = request.only(['uid', 'password']);
    const payload = await loginValidator.validate(data);
    return await this.loginUsecase.handle(payload.uid, payload.password);
  }

  async sendResetPasswordEmail({ request }: HttpContext) {
    const data = request.only(["email"]);
    const { email } = await sendResetPasswordEmailValidator.validate(data);
    return this.sendResetPasswordEmailUsecase.handle(email);
  }

  async getResetPasswordForm({ request, response, view }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('L\'URL est invalide ou expiré.')
    }
    const { userId } = request.params();
    return view.render('reset-password-form', { userId });
  }

  async resetPassword({ request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('L\'URL est invalide ou expiré.')
    }
    const userIdFromParams = parseInt(request.params().userId);
    const formData = request.only(['password', 'passwordConfirmation']);
    const { userId, password } = await resetPasswordValidator.validate({ userId: userIdFromParams, ...formData });
    await this.updateUserUsecase.handle(
      userId,
      { password }
    );
    return response.redirect().toRoute('password-successfully-reset');
  }
}