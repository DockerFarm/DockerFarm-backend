import passportJWT from 'passport-jwt';
import User from 'db/models/User';
import Endpoint from 'db/models/EndPoint';
import config from 'config';

const Strategy   = passportJWT.Strategy;

const cookieExtractor = ctx => {
    let token = null;
    if (ctx && ctx.cookies)
    {
        token = ctx.cookies.get('accessToken');
    }
    return token;
};

let options = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: cookieExtractor
};


const jwtStrategy = new Strategy(options, async (payload, done) => {
    
    let user = await User.findByEmail(payload.email);
    let activeEndpoint = await Endpoint.selectActiveEndpoint({userId: user._id});

    user.endpoint = activeEndpoint; 

    if(!user){
        return done(new Error("User not found"), null);
    }

    return done(null, user);

});

export default jwtStrategy;