import Router from 'koa-router';
import * as userCtrl from './user.ctrl';

const router = new Router();

router.get('/me',userCtrl.me);

router.post('/endpoint', userCtrl.addEndpoint);
router.get('/endpoint', userCtrl.selectAllEndpoints);
router.delete('/endpoint/:id', userCtrl.removeEndpoint);

export default router;