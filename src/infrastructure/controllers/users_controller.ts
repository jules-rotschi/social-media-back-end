import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import CreateUserUsecase from '../../domain/usecases/user/create-user-usecase.js';
import GetUserUsecase from '../../domain/usecases/user/get-user-usecase.js';
import { createUserValidator } from '#validators/user-validators';

@inject()
export default class UsersController {

  constructor(
    private createUserUsecase: CreateUserUsecase,
    private getUserUsecase: GetUserUsecase
  ) {}
  
  async signup({ request }: HttpContext) {
    const data = request.body().user;
    const payload = await createUserValidator.validate(data);
    await this.createUserUsecase.handle(payload);
  }

  async getById({ request }: HttpContext) {
    const user = await this.getUserUsecase.handle(request.params().id);
    return user;
  }
}