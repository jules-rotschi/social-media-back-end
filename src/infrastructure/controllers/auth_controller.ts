import { LoginUsecase } from "#usecases/auth/login_usecase";
import { ForgottenPasswordUsecase } from "#usecases/auth/forgotten_password_usecase";
import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import { signupValidator } from "#validators/signup_validator";
import { loginValidator } from "#validators/login_validator";
import { sendResetPasswordEmailValidator } from "#validators/send_reset_password_email_validator";
import { resetPasswordValidator } from "#validators/reset_password_validator";
import { SignupUsecase } from "#usecases/auth/signup_usecase";
import { ResetPasswordUsecase } from "#usecases/auth/reset_password_usecase";

@inject()
export default class AuthController {

  constructor(
    private signupUsecase: SignupUsecase,
    private loginUsecase: LoginUsecase,
    private forgottenPasswordUsecase: ForgottenPasswordUsecase,
    private resetPasswordUsecase: ResetPasswordUsecase
  ) {}

  async signup({ request }: HttpContext) {
    const data = request.input('data');
    const payload = await signupValidator.validate(data);
    return {
      data: await this.signupUsecase.handle(payload)
    }
  }

  async login({ request }: HttpContext) {
    const data = request.input('data');
    const payload = await loginValidator.validate(data);
    return {
      data: await this.loginUsecase.handle(payload)
    }
  }

  async sendResetPasswordEmail({ request }: HttpContext) {
    const data = request.input('data');
    const payload = await sendResetPasswordEmailValidator.validate(data);
    
    return this.forgottenPasswordUsecase.handle(payload.email);
  }

  async getResetPasswordForm({ request, response, view }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('L\'URL est invalide ou expiré.');
    }
    const userId = parseInt(request.param('userId'));
    return view.render('reset_password_form', { userId });
  }

  async resetPassword({ request, response, view }: HttpContext) {
    
    if (!request.hasValidSignature()) {
      return response.badRequest('L\'URL est invalide ou expiré.')
    }

    const data = request.only(['password', 'passwordConfirmation']);
    const [errors, payload] = await resetPasswordValidator.tryValidate(data);

    if (errors) {
      const userId = parseInt(request.param('userId'));
      return view.render('reset_password_form', { userId, errorMessages: errors.messages })
    }
    
    if (payload) {
      const userId = parseInt(request.param('userId'));
      await this.resetPasswordUsecase.handle(
        userId,
        payload.password
      );
      return response.redirect().toRoute('auth.passwordSuccessfullyReset');
    }
  }
}