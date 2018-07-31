import Router from 'koa-router';
import config from 'config';
import * as authCtrl from './auth.ctrl';
import {
    passport,
    googleAuth,
    githubAuth
} from 'config/passport';
const router = new Router();


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

router.get('/github', githubAuth());
router.get('/github/callback', githubAuth({failureRedirect : `${config.frontUrl}/unAuthorized`}), authCtrl.socialCallback);

router.get('/google', googleAuth());
router.get('/google/callback', googleAuth({failureRedirect : `${config.frontUrl}/unAuthorized`}), authCtrl.socialCallback);

export default router;