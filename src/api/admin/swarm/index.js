import Router from 'koa-router';
import * as swarmCtrl from './swarm.ctrl';

const router = new Router();

router.get('/', swarmCtrl.getSwarmInfo);
router.post('/init', swarmCtrl.swarmInit);
router.post('/join', swarmCtrl.swarmJoin);
router.post('/leave', swarmCtrl.swarmLeave)
router.get('/token', swarmCtrl.getSwarmToken);
router.get('/raw', swarmCtrl.getSwarmInspectRaw);


export default router;
