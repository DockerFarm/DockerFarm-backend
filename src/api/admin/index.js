import Router from 'koa-router';
import endpoint from './endpoint';

const router = new Router;


router.use('/endpoint', endpoint.routes());

export default router;