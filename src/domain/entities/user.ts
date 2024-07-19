type Email = string

export interface User {
  id: number;
  username: string;
  fullName?: string | null;
  email: Email;
  password: string;
  description?: string;
  picture?: string;
}