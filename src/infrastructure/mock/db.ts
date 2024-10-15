import { User } from "#entities/user";

interface MockDatabase {
  users: User[];
}

export const mockDatabase: MockDatabase = {
  users: []
};