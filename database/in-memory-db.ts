import { User } from "#entities/user"

interface Database {
  users: User[];
}

export const db: Database = {
  users: []
}