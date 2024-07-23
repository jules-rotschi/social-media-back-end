import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    uid: vine.string().trim(),
    password: vine.string()
  })
);

const messages = {
  'required': 'Veuillez entrer un {{ field }}'
};

const fields = {
  uid: 'e-mail ou nom d\'utilisateur',
  password: 'mot de passe'
}

loginValidator.messagesProvider = new SimpleMessagesProvider(messages, fields);