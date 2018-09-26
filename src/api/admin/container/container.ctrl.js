import * as ContainerApi from 'lib/dockerApi/container';
import { preparePortbinding, prepareExposePorts } from 'lib/utility';
import Joi from 'joi';

export const getContainerList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const data = await ContainerApi.getContainerList(url);
        ctx.status = 200;
        ctx.body = { result: data};
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getContainerInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {

        const data = await ContainerApi.getContainerInfo({url, id});
        ctx.status = 200;
        ctx.body = { result: data};
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getContainerInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ContainerApi.getContainerInspectRaw({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const pruneContainer = async ctx => {
    const { endpoint: {url} } = ctx.state.user;

    try {
        const { data } = await ContainerApi.pruneContainer(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const createContainer = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const form = ctx.request.body;
    const { bindings, exposed } = preparePortbinding(form);

    try {
        console.log(bindings);
        const { data } = await ContainerApi.createContainer({url, form}, bindings, exposed);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}


export const commandToContainer = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id, command } = ctx.params;
    const { form } = ctx.request.body;

    const commandMap = {
        'start': ContainerApi.startContainer,
        'restart': ContainerApi.restartContainer,
        'stop' : ContainerApi.stopContainer,
        'pause': ContainerApi.pauseContainer,
        'resume': ContainerApi.resumeContainer,
        'kill': ContainerApi.killContainer,
        'remove': ContainerApi.removeContainer,
        'update': ContainerApi.updateContainer
    };

    try {
        const schema = Joi.object().keys({
            command: Joi.string().valid(
                'start',
                'restart',
                'stop',
                'pause',
                'resume',
                'kill',
                'remove',
                'update'
            ).required(),
        });

        let validateResult = schema.validate({ command });

        if( validateResult.error != null ) {
            ctx.status = 422;
            ctx.body = {
                type : "ValidateError",
                message : `invalid command ${command}`
            };
            return;
        };

        const { data } = await commandMap[command]({url, id, form});
        ctx.status = 200;
        ctx.body = { result: data};
    } catch(e) {
        console.log(e);
        ctx.throw(e, 500);
    }
}
