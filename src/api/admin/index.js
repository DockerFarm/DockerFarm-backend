import Router from 'koa-router';
import endpoint from './endpoint';
import container from './container';

const router = new Router;


router.use('/endpoint', endpoint.routes());
router.use('/container', container.routes());

export default router;