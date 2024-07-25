import { User, UserUID } from "#entities/user";

export interface LoginUserDto {
  uid: UserUID;
  password: User["password"];
}