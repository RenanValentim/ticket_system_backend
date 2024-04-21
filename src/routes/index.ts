import express, { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import { ensureAuthenticated } from '../middleware/isAuthenticated';

const router = Router();

router.use('/wallpaper', express.static('public/images/login/'));
router.use('/modelo', express.static('public/modelo'));
router.use('/auth', authRouter);
router.use('/user', userRouter);
// router.use('/agency', ensureAuthenticated, agencyRouter);

export { router };
