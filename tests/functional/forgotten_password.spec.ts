import { test } from '@japa/runner'

test.group('Forgotten password', () => {

  test('unknown e-mail', async ({ client }) => {
    const response = await client.post("/forgotten-password").json({
      data: {
        email: "jane@example.com"
      }
    });
    response.assertStatus(404);
    response.assertBody({
      errors: [
        {
          message: "Cet e-mail n'est associé à aucun compte",
          type: "domain"
        }
      ]
    });
  })

  test('sent e-mail', async ({ client }) => {
    const response = await client.post("/forgotten-password").json({
      data: {
        email: "jules.rotschi@example.com"
      }
    });
    response.assertStatus(200);
  })
})