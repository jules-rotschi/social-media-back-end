import UserModel from '#models/user'
import hash from '@adonisjs/core/services/hash';
import router from '@adonisjs/core/services/router';
import db from '@adonisjs/lucid/services/db';
import { test } from '@japa/runner'

test.group('Reset password', (group) => {
  group.setup(async () => {
    await UserModel.create({
      id: 34880,
      username: "test-user",
      email: "test.user@example.com",
      fullName: "Test user",
      password: "This is my password"
    })
    const user = await db.from("users").select("*").where("id", 34880).first();
    console.log("Created user:", user);
  });

  test('unsigned route', async ({ assert, client }) => {
    const response = await client.post(`/reset-password/${34880}`).json({
      password: "This is my new password",
      passwordConfirmation: "This is my new password"
    });
    response.assertStatus(400);
    const user = await db.from("users").select("password").where("id", 34880).first();
    assert.isTrue(await hash.verify(user.password, "This is my password"));
  })

  test('bad password', async ({ assert, client }) => {
    const route = router.builder().params({ userId: 34880 }).makeSigned('auth.resetPassword');
    const response = await client.post(route).json({
      password: "password",
      passwordConfirmation: "password"
    });
    response.assertStatus(200);
    const user = await db.from("users").select("password").where("id", 34880).first();
    assert.isTrue(await hash.verify(user.password, "This is my password"));
  })

  test('successfully reset', async ({ client }) => {
    const route = router.builder().params({ userId: 34880 }).makeSigned('auth.resetPassword');
    const response = await client.post(route).form({
      password: "This is my new password",
      passwordConfirmation: "This is my new password"
    });
    response.assertRedirectsTo("/password-successfully-reset");
    const loginResponse = await client.post("/login").json({
      data: {
        uid: "test-user",
        password: "This is my new password"
      }
    });    
    loginResponse.assertStatus(200);
  })
})