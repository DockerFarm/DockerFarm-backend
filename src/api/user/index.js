import Router from 'koa-router';
import * as userCtrl from './user.ctrl';
import authMiddleware from 'lib/middleware/authMiddleware';
import {
    passport,
    jwtAuth
} from 'config/passport';

const router = new Router();

router.get('/me', jwtAuth() ,userCtrl.me);

export default router;