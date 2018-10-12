import Router from 'koa-router';
import * as taskCtrl from './task.ctrl';

const router = new Router();

router.get('/:id', taskCtrl.getTaskList);
router.get('/:id/info', taskCtrl.getTaskInfo);
router.get('/:id/log', taskCtrl.getTaskLog);

export default router;
