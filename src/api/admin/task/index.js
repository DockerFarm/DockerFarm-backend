import Router from 'koa-router';
import * as taskCtrl from './task.ctrl';

const router = new Router();

//service id
router.get('/:id', taskCtrl.getTaskList);
//task id
router.get('/:id/info', taskCtrl.getTaskInfo);
//task id
router.get('/:id/log', taskCtrl.getTaskLog);

export default router;
