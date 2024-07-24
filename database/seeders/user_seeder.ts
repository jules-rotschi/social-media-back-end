import UserModel from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    UserModel.create({
      username: "jules_rotschi",
      email: "jules.rotschi@example.com",
      fullName: "Jules Rotschi",
      password: "This is my password"
    })
  }
}