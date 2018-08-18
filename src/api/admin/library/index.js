import Router from 'koa-router';
import * as libraryCtrl from './library.ctrl';

const router = new Router();

router.get('/', libraryCtrl.getLibraryList);

export default router;
