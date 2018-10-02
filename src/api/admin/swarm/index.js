import Router from 'koa-router';
import * as swarmCtrl from './swarm.ctrl';

const router = new Router();

router.post('/', swarmCtrl.swarmInit);
router.get('/token', swarmCtrl.getSwarmToken);


export default router;
