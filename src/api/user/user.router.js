import { Router } from 'express';
import ctrl from './user.ctrl';
import authJwt from 'config/passport/jwt';

const router = new Router();

router.post('/signup', ctrl.signup);
router.post('/signin', ctrl.signin);
router.get('/me', authJwt.authenticate(), ctrl.me);

export default router;