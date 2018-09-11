import Router from 'koa-router';
import * as registryCtrl from './registry.ctrl';

const router = new Router();

router.get('/', registryCtrl.selectRegistries);
router.get('/list/:registry', registryCtrl.getSelectRegistryImage);
router.get('/:id', registryCtrl.selectRegistry);
router.post('/', registryCtrl.addRegistry);
router.put('/:id', registryCtrl.updateRegistry);
router.delete('/:id', registryCtrl.removeRegistry);

export default router;
