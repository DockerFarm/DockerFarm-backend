import Router from 'koa-router';
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
router.get('/github/callback', githubAuth({failureRedirect : '/unAuthorized'}), authCtrl.socialCallback);

router.get('/google', googleAuth());
router.get('/google/callback', googleAuth({failureRedirect : '/unAuthorized'}), authCtrl.socialCallback);

export default router;