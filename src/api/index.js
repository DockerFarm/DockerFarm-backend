import Router from 'koa-router';
import user from 'api/user';
import auth from 'api/auth';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/user', user.routes());

export default router;
