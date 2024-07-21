import { User } from "#entities/user";

export interface CreateUserDto {
  email: User["email"];
  username: User["username"];
  fullName: User["fullName"];
  password: User["password"];
}