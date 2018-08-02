import User from 'db/models/User';
import Joi from 'joi';
import parse from 'url-parse';
import ping from 'lib/ping';
import Boom from 'boom';

export const me = async ctx => {
    const {
        email,
        username
     } = ctx.state.user;

    ctx.body = {
        email,
        username
    };
}


export const addEndpoint = async ctx => {
    const { id } = ctx.state.user;
    const { name, url, tls } = ctx.request.body;


    const schema = Joi.object().keys({
        name: Joi.string().max(40).required(),
        url: Joi.string().max(50).required(),
        tls: Joi.boolean()
    });

    let validateResult = schema.validate({ name, url, tls});

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message }
        ;
        return;
    };

    const parsedUrl = parse(url);
    const host = parsedUrl.hostname;
    const port = parsedUrl.port;

    try{
        await ping(host, parseInt(port));
    } catch(e) {
        ctx.status = 400;
        ctx.message = "invalid host";
        return;
    }

    try{
        const result = await User.selectEndpoint({url, name});

        if( result.length > 0 ) {
            ctx.status = 409;
            ctx.message = 'endpoint url, name is unique!';
            return;
        }
    } catch(e) {
        ctx.throw(e, 500);
    }

    try { 
        const user = await User.addEndpoint({
            _id: id,
            name,
            url,
            tls
        });
        
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const selectAllEndpoints = async ctx => {
    const { id } = ctx.state.user;
    
    try{
        const result = await User.selectAllEndpoints({_id: id});

        ctx.status = 200;
        ctx.body = result.endpoints;
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const removeEndpoint = async ctx => {
    const userId = ctx.state.user.id;
    const { id } = ctx.params;

    try{
        
        const schema = Joi.object().keys({
            id: Joi.string().required(),
        });

        let validateResult = schema.validate({ id });

        if( validateResult.error != null ) {
            ctx.status = 422;
            ctx.body = { 
                type : "ValidateError",
                message : validateResult.error.details[0].message }
            ;
            return;
        };

        const result = await User.removeEndpoint({ userId, endpointId: id});

        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}