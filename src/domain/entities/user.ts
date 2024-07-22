type Email = string

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: Email;
  password: string;
  description: string | null;
  picture: string | null;
}

export type UserUID = User["email"] | User["username"];