/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import AuthController from '#controllers/auth_controller';

router.post("/signup", [AuthController, 'signup']);
router.post("/login", [AuthController, 'login']);

router.post("/forgotten-password", [AuthController, 'sendResetPasswordEmail']);
router.get("/reset-password/:userId", [AuthController, 'getResetPasswordForm']).as('reset-password-form');
router.post("/reset-password/:userId", [AuthController, 'resetPassword']).as('reset-password');
router.on("/password-successfully-reset").render('password-successfully-reset').as('password-successfully-reset');

router.get("/", ({}) => {
  return "You are connected"
}).use(middleware.auth({ guards: ["api"] }));