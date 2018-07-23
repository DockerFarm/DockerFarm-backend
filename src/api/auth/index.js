import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const router = new Router();


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

export default router;