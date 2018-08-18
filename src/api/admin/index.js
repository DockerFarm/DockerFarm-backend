import Router from 'koa-router';
import endpoint from './endpoint';
import container from './container';
import image from './image';
import network from './network';
import volume from './volume';
import dashboard from './dashboard';
import library from './library';

const router = new Router;

router.use('/endpoint', endpoint.routes());
router.use('/container', container.routes());
router.use('/image', image.routes());
router.use('/network', network.routes());
router.use('/volume', volume.routes());
router.use('/dashboard', dashboard.routes());
router.use('/library', library.routes());

export default router;
