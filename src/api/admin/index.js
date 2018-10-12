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
import swarm from './swarm';
import service from './service';
import task from './task';

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
router.use('/swarm', swarm.routes());
router.use('/service', service.routes());
router.use('/task', task.routes());

export default router;
