import { test } from '@japa/runner'

test.group('Login', () => {

  test('invalid credentials', async ({ client }) => {
    const response = await client.post('/api/v1/login').json({
      data: {
        uid: "jules_rotschi",
        password: "My password"
      }
    });
    response.assertStatus(400);
    response.assertBody({
      errors: [
        {
          message: "Identifiant ou mot de passe incorrect",
          type: "auth"
        }
      ]
    });
  });

  test('successful login', async ({ client, assert }) => {
    const response = await client.post('/api/v1/login').json({
      data: {
        uid: "jules_rotschi",
        password: "This is my password"
      }
    });
    response.assertStatus(200);
    assert.exists(response.body().data.token);
    const token = response.body().data.token;
    const protectedRouteResponse = await client.get('/api/v1/').headers({ "authorization": `Bearer ${token}` });
    protectedRouteResponse.assertStatus(200);
    protectedRouteResponse.assertTextIncludes("You are connected");
  });
})