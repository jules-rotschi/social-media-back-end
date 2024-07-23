import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import UpdateUserUsecase from '#usecases/user/update-user-usecase';

@inject()
export default class UsersController {

  constructor(
    private updateUserUsecase: UpdateUserUsecase,
  ) {}

  async update({ request }: HttpContext) {
    const { userId, updatedUser } = request.only(['userId', 'updatedUser']);
    this.updateUserUsecase.handle(userId, updatedUser);
  }
}