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
import { middleware } from './kernel.js';

router.post("/signup", [UsersController, 'signup']);
router.post("/login", [UsersController, 'login']);

router.get("/", () => {
  return "It works !"
}).use(middleware.auth({ guards: ["api"] }));