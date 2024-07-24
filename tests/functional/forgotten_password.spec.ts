import { test } from '@japa/runner'

test.group('Forgotten password', () => {

  test('unknown e-mail', async ({ client }) => {
    const response = await client.post("/forgotten-password").json({
      email: "jane@example.com"
    });
    response.assertStatus(404);
    response.assertTextIncludes("Cet e-mail n'est associé à aucun compte.");
  })

  test('sent e-mail', async ({ client }) => {
    const response = await client.post("/forgotten-password").json({
      email: "jules.rotschi@example.com"
    });
    response.assertStatus(200);
  })
})