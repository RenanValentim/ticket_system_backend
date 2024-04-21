import { Request, Response } from 'express';
import { sendResponse } from '../../lib/api';

import { TUser } from './user.types';
import { CreateUserSchema, UpdateUserSchema } from './user.validation';
import { UserService } from '../../services/user/userService';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const body = (await CreateUserSchema.validate(req.body.values)) as TUser;

      const user = await userService.Register(body);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const user = await userService.GetAll(req.query);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.GetById(+id);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = (await UpdateUserSchema.validate(req.body.values)) as TUser;

      const user = await userService.Update(+id, body);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.UpdateStatus(+id);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const user = await userService.ChangePassword(req.body);

      sendResponse(res, {
        ...user,
      });
    } catch (error) {
      sendResponse(res, error);
    }
  }
}
