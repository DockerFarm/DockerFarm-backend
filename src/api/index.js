import Router from 'koa-router';
import user from 'api/user';
import auth from 'api/auth';
import admin from 'api/admin';

import {
    passport,
    jwtAuth
} from 'config/passport';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/user', jwtAuth(), user.routes());
router.use('/admin', jwtAuth(), admin.routes());

export default router;
