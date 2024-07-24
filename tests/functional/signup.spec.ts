import db from '@adonisjs/lucid/services/db';
import { test } from '@japa/runner'

test.group('Signup', () => {

  test('bad request', async ({ client, assert }) => {
    const response = await client.post('/signup').json({
      user: {
        username: "john$",
        email: "johnatexample.com",
        password: "password",
        passwordConfirmation: "password",
      }
    });
    response.assertStatus(422);
    response.assertBody([
      {
        "message": "Le nom d'utilisateur contient des caractères non-autorisés.",
        "rule": "regex",
        "field": "username"
      },
      {
        "message": "Veuillez entrer un nom complet ou pseudonyme",
        "rule": "required",
        "field": "fullName"
      },
      {
        "message": "L'e-mail est invalide",
        "rule": "email",
        "field": "email"
      },
      {
        "message": "Le mot de passe doit posséder au moins 12 caractères.",
        "rule": "minLength",
        "field": "password",
        "meta": {
          "min": 12
        }
      }
    ])
    const createdUserInDatabase = await db.from('users').select().where("username", "john$").first();
    assert.notExists(createdUserInDatabase);
  });

  test('successful signup', async ({ client, assert }) => {
    const response = await client.post('/signup').json({
      user: {
        username: "john",
        email: "john@example.com",
        fullName: "John",
        password: "This is my password",
        passwordConfirmation: "This is my password",
      }
    });
    response.assertStatus(200);
    assert.exists(response.body().token);
    const createdUserInDatabase = await db.from('users').select("username").where("email", "john@example.com").first();
    assert.equal(createdUserInDatabase.username, "john");
  });

  test('username already exists', async ({ client, assert }) => {
    const response = await client.post('/signup').json({
      user: {
        username: "john",
        email: "john.doe@example.com",
        fullName: "John Doe",
        password: "This is my password",
        passwordConfirmation: "This is my password",
      }
    });
    response.assertStatus(422);
    response.assertBody([
      {
        "message": "Ce nom d'utilisateur est déjà utilisé.",
        "rule": "unique",
        "field": "username"
      }
    ]);
    const createdUserInDatabase = await db.from('users').select("username").where("email", "john.doe@example.com").first();
    assert.notExists(createdUserInDatabase);
  });
})