import Router from 'koa-router';
import * as userCtrl from './user.ctrl';
import {
    passport,
    jwtAuth
} from 'config/passport';

const router = new Router();

router.get('/me', jwtAuth() ,userCtrl.me);

export default router;