/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.post("/signup", [UsersController, 'signup']);
router.get("/users/:id", [UsersController, 'getById']);

// router.get("/", () => {
//   return "It works !"
// });