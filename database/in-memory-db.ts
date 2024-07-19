import { User } from "../src/domain/entities/user.js"

interface Database {
  users: User[];
}

export const db: Database = {
  users: []
}