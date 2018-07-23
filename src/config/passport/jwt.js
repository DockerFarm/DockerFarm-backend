import passportJWT from 'passport-jwt';
import User from 'db/models/User';
import config from 'config';

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy   = passportJWT.Strategy;


var options = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
};


const jwtStrategy = new Strategy(options, async (payload, done) => {
    const user = await User.findByEmail(payload.email);

    if(!user){
        return done(new Error("User not found"), null);
    }

    return done(null, user);

});

export default jwtStrategy;