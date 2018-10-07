import Registry from 'db/models/Registry';
import * as RegistryApi from 'lib/dockerApi/registry';
import Joi from 'joi';
import ping from 'lib/ping';
import parse from 'url-parse';

export const addRegistry = async ctx => {
    const { id } = ctx.state.user;
    const { name, url, isAuth, username, password } = ctx.request.body;

    const schema = Joi.object().keys({
        name: Joi.string().max(40).required(),
        url: Joi.string().max(50).required()
    });

    const authSchema = Joi.object().keys({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(200).required()
    })

    let validateResult = schema.validate({ url, name });

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message 
        };
        return;
    };

    if( isAuth ) {
        validateResult = authSchema.validate({ username, password });
         
        if( validateResult.error != null ) {
            ctx.status = 422;
            ctx.body = { 
                type : "ValidateError",
                message : validateResult.error.details[0].message 
            };
            return;
        };
    }

    try {
        const result = await Registry.checkRegistry({ userId: id, url, name });

        if( result.length > 0 ){
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
        const registry = await Registry.addRegistry({
            userId: id,
            isAuth,
            name,
            url,
            username,
            password
        });
        
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const updateRegistry = async ctx => {
    const { id } = ctx.state.user;
    const registryId = ctx.params.id;
    const { name, url, isAuth, username, password } = ctx.request.body;

    const schema = Joi.object().keys({
        name: Joi.string().max(40).required(),
        url: Joi.string().max(50).required()
    });

    const authSchema = Joi.object().keys({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(200).required()
    })

    let validateResult = schema.validate({ url, name });

    if( validateResult.error != null ) {
        ctx.status = 422;
        ctx.body = { 
            type : "ValidateError",
            message : validateResult.error.details[0].message 
        };
        return;
    };

    if( isAuth ) {
        validateResult = authSchema.validate({ username, password });
         
        if( validateResult.error != null ) {
            ctx.status = 422;
            ctx.body = { 
                type : "ValidateError",
                message : validateResult.error.details[0].message 
            };
            return;
        }
    } else {
        
    }


    try {
        const result = await Registry.checkRegistry({ 
            userId: id,
            url,
            name
        });

        const filtered = result.filter( v => v._id != registryId );

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
        const registry = await Registry.updateRegistry({
            _id: registryId,
            name,
            url,
            isAuth,
            username,
            password
        });
        
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }

}


export const selectRegistries = async ctx => {
    const { id } = ctx.state.user;
    
    try{
        const data = await Registry.selectRegistriesByUserId({userId : id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const selectRegistry = async ctx => {
    const { id } = ctx.state.user;
    const registryId = ctx.params.id;
    
    try{
        const data = await Registry.selectRegistry({userId : id, id: registryId});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
    
}

export const removeRegistry = async ctx => {
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

        const result = await Registry.removeRegistry({ _id: id});

        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const selectAllRegistryImage = async ctx => {
    const { id } = ctx.state.user;
    const registryId = ctx.params.id;

    try {
        const registry = await Registry.selectRegistry({userId : id, id: registryId});
        const data  = await RegistryApi.selectAllRegistryImage(registry);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
