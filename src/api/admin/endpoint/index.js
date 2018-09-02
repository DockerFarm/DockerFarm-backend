import Router from 'koa-router';
import * as endpointCtrl from './endpoint.ctrl';

const router = new Router();

router.get('/', endpointCtrl.selectEndpoints);
router.post('/', endpointCtrl.addEndpoint);
router.post('/:id/active', endpointCtrl.activeEndpoint);
router.put('/:id', endpointCtrl.updateEndpoint);
router.delete('/:id', endpointCtrl.removeEndpoint);

export default router;

