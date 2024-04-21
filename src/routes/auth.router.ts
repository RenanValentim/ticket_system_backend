import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
import { ensureAuthenticated } from '../middleware/isAuthenticated';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.get('/user-conected', authController.usersConected);
authRouter.post('/logout', ensureAuthenticated, authController.logout);
authRouter.post(
  '/verify_password',
  ensureAuthenticated,
  authController.verify_password,
);

export default authRouter;
