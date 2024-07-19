/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '../src/infrastructure/controllers/users_controller.js'

// router.get("/", async () => {
//   return "Hello"
// })

router.post("/signup", [UsersController, 'signup'])
router.get("/users/:id", [UsersController, 'getById'])