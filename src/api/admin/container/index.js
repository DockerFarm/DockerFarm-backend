import Router from 'koa-router';
import * as containerCtrl from './container.ctrl';

const router = new Router();

router.get('/', containerCtrl.getContainerList);
router.get('/:id', containerCtrl.getContainerInfo);
router.get('/:id/raw', containerCtrl.getContainerInspectRaw);
router.post('/:id/:command', containerCtrl.commandToContainer);
router.post('/create', containerCtrl.createContainer);

export default router;
