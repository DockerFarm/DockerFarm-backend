import Router from 'koa-router';
import * as volumeCtrl from './volume.ctrl';

const router = new Router();

router.get('/', volumeCtrl.getVolumeList);
router.get('/driver', volumeCtrl.getVolumeDriver);
router.get('/:id', volumeCtrl.getVolumeInfo);
router.get('/:id/raw', volumeCtrl.getVolumeInspectRaw);
router.delete('/:id', volumeCtrl.deleteVolume);
router.post('/', volumeCtrl.createVolume);


export default router;
