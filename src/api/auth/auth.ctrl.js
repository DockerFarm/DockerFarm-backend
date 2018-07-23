import User from 'db/models/User';
import jwt from 'jsonwebtoken';
import logger from 'lib/logger';
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
        password : Joi.string().min(8).max(10).required()
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

        let accessToken = jwt.sign({ email : existUser.email }, config.jwtSecret, { expiresIn : '1h'});
        let refreshToken = jwt.sign({ email : existUser.email }, config.jwtSecret, { expiresIn : '7d'});

        ctx.body = {
            accessToken,
            refreshToken
        };

    } catch(e) {
        ctx.throw(e, 500);     
    }
};

