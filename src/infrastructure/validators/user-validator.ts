import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(2).regex(new RegExp('^[a-z0-9_.\-]+$')).escape().use(uniqueRule({ table: 'users', column: 'username' })),
    fullName: vine.string().trim().escape(),
    email: vine.string().email().use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().minLength(12).escape().confirmed({ confirmationField: "passwordConfirmation" }),
  })
)
