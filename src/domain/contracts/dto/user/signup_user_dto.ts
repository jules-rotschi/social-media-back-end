import { User } from "#entities/user";

export interface SignupUserDto {
  email: User["email"];
  username: User["username"];
  fullName: User["fullName"];
  password: User["password"];
}