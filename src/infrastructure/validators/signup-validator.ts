import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(2).regex(new RegExp('^[a-z0-9_.\-]+$')).escape().use(uniqueRule({ table: 'users', column: 'username' })),
    fullName: vine.string().trim().minLength(1).escape(),
    email: vine.string().email().use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().minLength(12).escape().confirmed({ confirmationField: "passwordConfirmation" }),
  })
);

const messages = {
  'required': 'Veuillez entrer un {{ field }}',
  'username.minLength': 'Le nom d\'utilisateur doit posséder au moins 2 caractères.',
  'username.regex': 'Le nom d\'utilisateur contient des caractères non-autorisés.',
  'username.unique': 'Ce nom d\'utilisateur est déjà utilisé.',
  'fullName.minLength': 'Veuillez entrer un nom complet ou pseudonyme',
  'email.email': 'L\'e-mail est invalide',
  'email.unique': 'Cet e-mail est déjà associé à un compte.',
  'password.minLength': 'Le mot de passe doit posséder au moins 12 caractères.',
  'password.confirmed': 'Les mots de passe ne correspondent pas.'
};

const fields = {
  username: 'nom d\'utilisateur',
  fullName: 'nom complet ou pseudonyme',
  email: 'e-mail',
  password: 'mot de passe'
}

signupValidator.messagesProvider =
  new SimpleMessagesProvider(messages, fields);