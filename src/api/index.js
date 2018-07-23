import Router from 'koa-router';
import user from 'api/user';
import auth from 'api/auth';
import authCheck from 'lib/middleware/authCheck';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/user', authCheck(), user.routes());

export default router;
