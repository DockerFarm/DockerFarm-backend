import passport from 'koa-passport';
import JWTStrategy from './jwt';
import GoogleStrategy from './google';
import GithubStrategy from './github';


passport.serializeUser((user, done) => { 
    done(null, user);
 });
 
 passport.deserializeUser((user, done) => { 
    done(null, user); 
 });

 passport.use(JWTStrategy);
 passport.use(GithubStrategy);
 passport.use(GoogleStrategy);

 const jwtAuth = () => passport.authenticate('jwt', { session: false});
 const githubAuth = opts => passport.authenticate('github', opts);
 const googleAuth = opts => passport.authenticate('google', opts);

 export {
     jwtAuth,
     githubAuth,
     googleAuth,
     passport
 };