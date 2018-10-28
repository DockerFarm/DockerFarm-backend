import Router from 'koa-router';
import * as serviceCtrl from './service.ctrl';

const router = new Router();

router.get('/', serviceCtrl.getServiceList);
router.get('/:id', serviceCtrl.getServiceInfo);
router.get('/:id/log', serviceCtrl.getServiceLog);
router.post('/create', serviceCtrl.createService);
router.delete('/:id', serviceCtrl.deleteService);

export default router;
