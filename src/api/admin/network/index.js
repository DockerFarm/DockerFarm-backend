import Router from 'koa-router';
import * as networkCtrl from './network.ctrl';

const router = new Router();

router.get('/', networkCtrl.getNetworkList);
router.get('/:id', networkCtrl.getNetworkInfo);
router.get('/:id/raw', networkCtrl.getNetworkInspectRaw);
router.delete('/:id', networkCtrl.deleteNetwork);
router.post('/', networkCtrl.createNetwork);

export default router;
