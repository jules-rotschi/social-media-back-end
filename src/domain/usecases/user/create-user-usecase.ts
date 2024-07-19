import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { UserEntity } from "../../entities/user.js";

@inject()
export default class CreateUserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(user: UserEntity) {
    this.userRepository.create(user);    
  }
}