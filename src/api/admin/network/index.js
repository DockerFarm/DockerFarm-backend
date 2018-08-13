import Router from 'koa-router';
import * as networkCtrl from './network.ctrl';

const router = new Router();

router.get('/', networkCtrl.getNetworkList);
router.get('/:id', networkCtrl.getNetworkInfo);
router.get('/:id/raw', networkCtrl.getNetworkInspectRaw);
router.delete('/:id', networkCtrl.deleteNetwork);
//need to fix addNetwork
router.post('/add', networkCtrl.addNetwork);

export default router;
