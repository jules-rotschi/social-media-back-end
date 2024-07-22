import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import CreateUserUsecase from '../../domain/usecases/user/create-user-usecase.js';
import GetUserUsecase from '../../domain/usecases/user/get-user-usecase.js';
import { createUserValidator } from '#validators/user-validators';
import LoginUsecase from '#usecases/user/login-usecase';

@inject()
export default class UsersController {

  constructor(
    private createUserUsecase: CreateUserUsecase,
    private loginUsecase: LoginUsecase,
    private getUserUsecase: GetUserUsecase
  ) {}
  
  async signup({ request }: HttpContext) {
    const data = request.body().user;
    const payload = await createUserValidator.validate(data);
    return await this.createUserUsecase.handle(payload);
  }

  async login({ request }: HttpContext) {
    const { uid, password } = request.only(['uid', 'password']);
    return await this.loginUsecase.handle(uid, password);
  }

  async getById({ request }: HttpContext) {
    const user = await this.getUserUsecase.handle(request.params().id);
    return user;
  }
}