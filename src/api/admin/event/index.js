import Router from 'koa-router';
import * as eventCtrl from './event.ctrl';

const router = new Router();

router.get('/:params', eventCtrl.getEvents);

export default router;
