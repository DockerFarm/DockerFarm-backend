import Router from 'koa-router';
import * as containerCtrl from './container.ctrl';

const router = new Router();

router.get('/', containerCtrl.getContainerList);
router.get('/:id', containerCtrl.getContainerInfo);
router.get('/:id/raw', containerCtrl.getContainerInspectRaw);
router.post('/prune', containerCtrl.pruneContainer);
router.post('/:id/:command', containerCtrl.commandToContainer);

export default router;
