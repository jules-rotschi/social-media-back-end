import { Email, EmailFactory } from "#value_objects/email";

export class User {

  id?: number;
  username: string;
  email: Email;
  fullName: string;
  password: string;
  description?: string;
  picture?: string;

  constructor(
    username: string,
    email: Email,
    fullName: string,
    password: string
  ) {
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.password = password;
  }
}

export type UserUID = User["username"] | User["email"];

export class UserFactory {

  create(userToCreate: UserToCreate): User {

    const emailFactory = new EmailFactory();
    const userEmail = emailFactory.create(userToCreate.email);

    const user = new User(
      userToCreate.username,
      userEmail,
      userToCreate.fullName,
      userToCreate.password
    )

    if (userToCreate.id) user.id = userToCreate.id;
    if (userToCreate.description) user.description = userToCreate.description;
    if (userToCreate.picture) user.picture = userToCreate.picture;

    return user;
  }
}

interface UserToCreate {
  id?: number;
  username: string;
  email: string;
  fullName: string;
  password: string;
  description?: string;
  picture?: string;
}
