import passport from 'passport';  
import passportJWT from 'passport-jwt';
import db from 'db';
import config from 'config';

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy   = passportJWT.Strategy;

const User = db.sequelize.models.User;

var options = {  
    secretOrKey: config.passport.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')

};

console.log(options);
export default (() => {

    let strategy = new Strategy(options, function(payload, done) {

        User.findOne({ where : { email : payload.email }})
            .then( user => {
                if ( user ) {
                    return done(null, {
                        email : user.email
                    });
                } else {
                    return done(new Error("User not found"), null);
                }
                    
            });

    });

    passport.serializeUser((user, done) => { 
       done(null, user);
    });
    
    passport.deserializeUser((user, done) => { 
       done(null, user); 
    });
    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", { session : config.passport.jwt.session });
        }
    };
})();