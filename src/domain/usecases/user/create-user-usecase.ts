import { inject } from "@adonisjs/core";
import { UserRepository } from "../../contracts/repositories/user-repository.js";
import { CreateUserDto } from "#contracts/dto/user/create-user-dto";

@inject()
export default class CreateUserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(user: CreateUserDto) {
    this.userRepository.create(user);    
  }
}