import { test } from '@japa/runner'

test.group('Login', () => {

  test('invalid credentials', async ({ client }) => {
    const response = await client.post('/login').json({
      uid: "jules_rotschi",
      password: "My password"
    });
    response.assertStatus(400);    
    response.assertTextIncludes("Invalid user credentials");
  });

  test('successful login', async ({ client, assert }) => {
    const response = await client.post('/login').json({
      uid: "jules_rotschi",
      password: "This is my password"
    });
    response.assertStatus(200);
    assert.exists(response.body().token);
    const token = response.body().token;

    const protectedRouteResponse = await client.get('/').headers({ "authorization": `Bearer ${token}` });
    protectedRouteResponse.assertStatus(200);
    protectedRouteResponse.assertTextIncludes("You are connected");
  });
})