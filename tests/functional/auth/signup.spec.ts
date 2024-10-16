import db from '@adonisjs/lucid/services/db';
import { test } from '@japa/runner'

test.group('Signup', () => {

  test('bad request', async ({ client, assert }) => {
    const response = await client.post('/api/v1/signup').json({
      data: {
        username: "john$",
        email: "johnatexample.com",
        password: "password",
        passwordConfirmation: "password",
      }
    });
    response.assertStatus(422);
    assert.equal(response.body().errors.length, 4)
    const createdUserInDatabase = await db.from('users').select().where("username", "john$").first();
    assert.notExists(createdUserInDatabase);
  });

  test('successful signup', async ({ client, assert }) => {
    const response = await client.post('/api/v1/signup').json({
      data: {
        username: "john",
        email: "john@example.com",
        fullName: "John",
        password: "This is my password",
        passwordConfirmation: "This is my password",
      }
    });
    
    response.assertStatus(200);
    assert.exists(response.body().data.token);
    assert.equal(response.body().data.user.username, 'john');
    const createdUserInDatabase = await db.from('users').select("username").where("email", "john@example.com").first();
    assert.equal(createdUserInDatabase.username, "john");
  });

  test('username already exists', async ({ client, assert }) => {
    const response = await client.post('/api/v1/signup').json({
      data: {
        username: "john",
        email: "john.doe@example.com",
        fullName: "John Doe",
        password: "This is my password",
        passwordConfirmation: "This is my password",
      }
    });
    response.assertStatus(422);
    response.assertBody({
        errors: [
          {
            "message": "Ce nom d'utilisateur est déjà utilisé.",
            "rule": "unique",
            "field": "username",
            "type": "validation"
          }
        ]
    });
    const createdUserInDatabase = await db.from('users').select("username").where("email", "john.doe@example.com").first();
    assert.notExists(createdUserInDatabase);
  });
})