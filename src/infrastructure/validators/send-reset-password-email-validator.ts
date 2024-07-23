import vine, { SimpleMessagesProvider } from "@vinejs/vine";

export const sendResetPasswordEmailValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email()
  })
);

const messages = {
  'required': 'Veuillez entrer un {{ field }}',
  'email.email': 'L\'e-mail est invalide.'
};

const fields = {
  email: 'e-mail',
}

sendResetPasswordEmailValidator.messagesProvider =
  new SimpleMessagesProvider(
    messages,
    fields
  );