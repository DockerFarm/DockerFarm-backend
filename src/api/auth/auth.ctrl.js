import User from 'db/models/User';
import logger from 'lib/logger';
import generateToken from 'lib/generateToken';
import config from 'config';
import Joi from 'joi';

export const register = async ctx => {
    const {
        email,
        password,
        username
    } = ctx.request.body;
    
    const schema = Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(10).required(),
        username : Joi.string().min(6).max(20).required()
    });

    let validateResult = schema.validate(ctx.request.body);

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message }
        ;
        return; 
    }
    
    
    try {
        const existUser = await User.findByEmail(email);
        
        if(!existUser){
            const user = await User.localSignup({ email, password, username });
            ctx.status = 200;
        } else {
            ctx.status = 409;
            ctx.body = { message : "Email is already exists!" };
        }
        
    } catch(e) {
        ctx.throw(e,500);
    }
};


export const login = async ctx => {
    const {
        email, 
        password
    } = ctx.request.body;

    const schema = Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(100).required()
    });

    let validateResult = schema.validate(ctx.request.body);

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message }
        ;
        return;
    }
    
    
    try {
        const existUser = await User.findByEmail(email);
        
        if(!existUser) {
            ctx.status = 403;
            ctx.body = { message : "User does not exists!"};
            return ;
        }

        if(!existUser.verifyPassword(password)){
            ctx.status = 403;
            ctx.body = { message : "Password does not match!"};
            return ;
        }

        let accessToken = generateToken({ email : existUser.email });

        ctx.cookies.set('accessToken',  accessToken, {
            httpOnly : true,
            expires: new Date((1000 * 60 * 60) + Date.now()) //1h
        });
        
        ctx.status = 200;

    } catch(e) {
        ctx.throw(e, 500);     
    }
};


export const socialCallback = ctx => {
    const { email } = ctx.state.user;
    let accessToken = generateToken({email});
    ctx.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date((1000 * 60 * 60) + Date.now()) //1h
    });
    ctx.redirect(config.frontUrl);
}