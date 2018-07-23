import Router from 'koa-router';
import * as userCtrl from './user.ctrl';

const router = new Router();

router.get('/me', userCtrl.me);

export default router;