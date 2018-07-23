import User from 'db/models/User';
import jwt from 'jsonwebtoken';
import config from 'config';

export default () => 
    async (ctx, next) => {
        let auth = ctx.request.headers['authorization'];

        if(!auth) {
            ctx.request.user = null;
            return next();
        }

        try{
            let token = auth.split("Bearer ")[1];
            const { email } = jwt.verify(token, config.jwtSecret);

            const user = await User.findByEmail(email);

            if(!user){
                ctx.request.user = null;
                return;
            }

            ctx.request.user = user;
            return next();

        } catch(e) {
            ctx.request.user = null;
        }

        return next();
};