import Router from 'koa-router';
import registry from './registry';
import endpoint from './endpoint';
import container from './container';
import image from './image';
import network from './network';
import volume from './volume';
import dashboard from './dashboard';
import library from './library';
import event from './event';

const router = new Router;

router.use('/endpoint', endpoint.routes());
router.use('/registry', registry.routes());
router.use('/container', container.routes());
router.use('/image', image.routes());
router.use('/network', network.routes());
router.use('/volume', volume.routes());
router.use('/dashboard', dashboard.routes());
router.use('/library', library.routes());
router.use('/event', event.routes());

export default router;
