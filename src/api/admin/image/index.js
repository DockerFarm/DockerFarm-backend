import Router from 'koa-router';
import * as imageCtrl from './image.ctrl';

const router = new Router();

router.get('/', imageCtrl.getImageList);
router.get('/:id', imageCtrl.getImageInfo);
router.get('/:id/raw', imageCtrl.getImageInspectRaw);

export default router;
