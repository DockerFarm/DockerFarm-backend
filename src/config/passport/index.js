import passport from 'koa-passport';
import JWTStrategy from './jwt';
import GithubStrategy from './github';


passport.serializeUser((user, done) => { 
    done(null, user);
 });
 
 passport.deserializeUser((user, done) => { 
    done(null, user); 
 });

 passport.use(JWTStrategy);
 passport.use(GithubStrategy);

 export default passport;