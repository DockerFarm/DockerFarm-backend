import { Router } from 'express';
import ctrl from './container.ctrl';

const router = new Router();

router.get('/list', ctrl.list);


export default router;