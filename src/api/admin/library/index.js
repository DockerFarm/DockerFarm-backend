import Router from 'koa-router';
import * as libraryCtrl from './library.ctrl';

const router = new Router();

router.get('/:page', libraryCtrl.getLibraryList);

export default router;
