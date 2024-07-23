import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    uid: vine.string().trim(),
    password: vine.string()
  })
);

const loginValidatorMessages = {
  'required': 'Veuillez entrer un {{ field }}'
};

const loginValidatorFields = {
  uid: 'e-mail ou nom d\'utilisateur',
  password: 'mot de passe'
}

loginValidator.messagesProvider = new SimpleMessagesProvider(loginValidatorMessages, loginValidatorFields);

export const sendResetPasswordEmailValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email()
  })
);

const sendResetPasswordEmailValidatorMessages = {
  'required': 'Veuillez entrer un {{ field }}',
  'email.email': 'L\'e-mail est invalide.'
};

const sendResetPasswordEmailValidatorFields = {
  email: 'e-mail',
}

sendResetPasswordEmailValidator.messagesProvider =
  new SimpleMessagesProvider(
    sendResetPasswordEmailValidatorMessages,
    sendResetPasswordEmailValidatorFields
  );

export const resetPasswordValidator = vine.compile(
  vine.object({
    
  })
)