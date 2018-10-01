import Router from 'koa-router';
import * as containerCtrl from './container.ctrl';

const router = new Router();

router.get('/', containerCtrl.getContainerList);
router.get('/:id', containerCtrl.getContainerInfo);
router.get('/:id/raw', containerCtrl.getContainerInspectRaw);
router.get('/:id/log', containerCtrl.getContainerLog);
router.get('/:id/top', containerCtrl.getProcessInsideContainer);
router.get('/:id/stat', containerCtrl.getContainerStat);
router.post('/prune', containerCtrl.pruneContainer);
router.post('/create', containerCtrl.createContainer);
router.post('/:id/:command', containerCtrl.commandToContainer);

export default router;
