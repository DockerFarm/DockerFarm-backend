import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import passport from 'config/passport';

const router = new Router();


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), ctx => ctx.redirect('/'));

export default router;