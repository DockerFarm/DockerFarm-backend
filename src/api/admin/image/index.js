import Router from 'koa-router';
import * as imageCtrl from './image.ctrl';

const router = new Router();

router.get('/', imageCtrl.getImageList);
router.get('/:id', imageCtrl.getImageInfo);
router.get('/:id/raw', imageCtrl.getImageInspectRaw);
router.post('/prune', imageCtrl.pruneImage);
router.post('/pull', imageCtrl.pullImage);
router.post('/:id/tag', imageCtrl.tagImage);
router.delete('/:id', imageCtrl.deleteImage);

export default router;
