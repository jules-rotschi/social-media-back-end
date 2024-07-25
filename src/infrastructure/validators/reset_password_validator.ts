import vine, { SimpleMessagesProvider } from "@vinejs/vine";

export const resetPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(12).escape().confirmed({ confirmationField: "passwordConfirmation" })
  })
)

const messages = {
  'required': 'Veuillez entrer un {{ field }}',
  'password.minLength': 'Le mot de passe doit posséder au moins 12 caractères.',
  'password.confirmed': 'Les mots de passe ne correspondent pas.'
};

const fields = {
  password: 'mot de passe'
}

resetPasswordValidator.messagesProvider =
  new SimpleMessagesProvider(messages, fields);