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
router.get("/reset-password/:userId", [AuthController, 'resetPasswordForm']).as('reset_password_form');
router.post("/reset-password", [AuthController, 'resetPassword']);
router.on("/password-successfully-reset").render('password-successfully-reset').as('password-successfully-reset');

router.get("/", () => {
  return "It works !"
}).use(middleware.auth({ guards: ["api"] }));