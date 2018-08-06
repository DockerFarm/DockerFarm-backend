import Endpoint from 'db/models/Endpoint';
import ping from 'lib/ping';
import Joi from 'joi';
import parse from 'url-parse';

export const addEndpoint = async ctx => {
    const { id } = ctx.state.user;
    const { name, url, tls, isActive } = ctx.request.body;


    const schema = Joi.object().keys({
        name: Joi.string().max(40).required(),
        url: Joi.string().max(50).required(),
        isActive: Joi.boolean(),
        tls: Joi.boolean()
    });

    let validateResult = schema.validate({ name, url, tls, isActive});

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message 
        };
        return;
    };

    try {
        const result = await Endpoint.selectEndpoint({ userId: id, url, name });

        if( result.length > 0 ){
            ctx.status = 409;
            ctx.body = {
                type: 'DuplicateError',
                message: 'url or name already exists!'
            }
        }
    }catch(e){
        ctx.throw(e, 500);
    }

    const parsedUrl = parse(url);
    const host = parsedUrl.hostname;
    const port = parsedUrl.port;

    try{
        await ping(host, parseInt(port));
    } catch(e) {
        ctx.status = 400;
        ctx.body = {
            type: 'InvalidHostError',
            message: 'invalid host'
        };
        return;
    }


    try { 
        if (isActive) {
            await Endpoint.unActiveAll({userId: id})
        }
        const user = await Endpoint.addEndpoint({
            userId: id,
            isActive,
            name,
            url,
            tls
        });
        
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const updateEndpoint = async ctx => {
    const { id } = ctx.state.user;
    const endpointId = ctx.params.id;
    const { name, url, tls, isActive } = ctx.request.body;


    const schema = Joi.object().keys({
        endpointId: Joi.string().required(),
        name: Joi.string().max(40).required(),
        url: Joi.string().max(50).required(),
        isActive: Joi.boolean(),
        tls: Joi.boolean()
    });

    let validateResult = schema.validate({ endpointId, name, url, isActive, tls});

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message 
        };
        return;
    };

    try {
        const result = await Endpoint.selectEndpoint({ 
            userId: id,
            url,
            name
        });

        const filtered = result.filter( v => v._id != endpointId );

        if( filtered.length > 0 ){
            ctx.status = 409;
            ctx.body = {
                type: 'DuplicateError',
                message: 'url or name already exists!'
            }
            return;
        }

    }catch(e){
        ctx.throw(e, 500);
    }

    const parsedUrl = parse(url);
    const host = parsedUrl.hostname;
    const port = parsedUrl.port;

    try{
        await ping(host, parseInt(port));
    } catch(e) {
        ctx.status = 400;
        ctx.body = {
            type: 'InvalidHostError',
            message: 'invalid host'
        };
        return;
    }

    try { 
        if (isActive) {
            await Endpoint.unActiveAll({ userId: id});
        }
        const user = await Endpoint.updateEndpoint({
            _id: endpointId,
            name,
            url,
            tls,
            isActive
        });
        
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }

}


export const selectEndpoints = async ctx => {
    const { id } = ctx.state.user;
    
    try{
        const result = await Endpoint.selectEndpointsByUserId({userId : id});
        ctx.status = 200;
        ctx.body = { data: result };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const removeEndpoint = async ctx => {
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

        const result = await Endpoint.removeEndpoint({ _id: id});

        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}