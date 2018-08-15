import Router from 'koa-router';
import * as dashboardCtrl from './dashboard.ctrl';

const router = new Router();

router.get('/', dashboardCtrl.getDashboardInfo);

export default router;
