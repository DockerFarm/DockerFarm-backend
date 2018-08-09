import Router from 'koa-router';
import endpoint from './endpoint';
import container from './container';
import image from './image';

const router = new Router;


router.use('/endpoint', endpoint.routes());
router.use('/container', container.routes());
router.use('/image', image.routes());

export default router;
