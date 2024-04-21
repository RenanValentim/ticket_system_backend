import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/create', userController.createUser);
userRouter.get('/getAll', userController.getAll);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.update);
userRouter.put('/updateStatus/:id', userController.updateStatus);
userRouter.post('/changePassword', userController.changePassword);

export default userRouter;
