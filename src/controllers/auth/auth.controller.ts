import { Request, Response } from 'express';
import { sendResponse } from '../../lib/api';
import { AuthenticateUserService } from '../../services/auth/authenticateUserService';
import { LogoutUserService } from '../../services/auth/logoutUserService';
import { UsersConectedService } from '../../services/auth/usersConnectedService';
import { VerifyPasswordService } from '../../services/auth/verifyPasswordService';
import {
  TLogin,
  TLogout,
  VerifyPasswordBody,
  VerifyPasswordParam,
} from './auth.types';
import { LoginSchema, VerifyPasswordSchema } from './auth.validation';

export class AuthController {
  async login(req: Request<null, null, TLogin>, res: Response) {
    try {
      const body = (await LoginSchema.validate(req.body)) as TLogin;

      const authenticateUserService = new AuthenticateUserService();

      const auth = await authenticateUserService.execute(body);

      sendResponse(res, {
        ...auth,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async logout(req: Request<TLogout>, res: Response) {
    try {
      const params = req.params;

      const logoutUserService = new LogoutUserService();

      const logout = await logoutUserService.execute(params);

      sendResponse(res, {
        ...logout,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async verify_password(
    req: Request<VerifyPasswordParam, null, VerifyPasswordBody>,
    res: Response,
  ) {
    try {
      const { id } = req.params;

      const body = (await VerifyPasswordSchema.validate(
        req.body,
      )) as VerifyPasswordBody;

      const verifyPasswordService = new VerifyPasswordService();

      const auth = await verifyPasswordService.execute(id, body.password);

      sendResponse(res, {
        ...auth,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async usersConected(req: Request, res: Response) {
    try {
      const usersConectedService = new UsersConectedService();

      const users = await usersConectedService.execute();
      sendResponse(res, {
        users,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }
}
