import * as SwarmApi from 'lib/dockerApi/swarm';

export const swarmInit = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const form = ctx.request.body;

    try {
        const { data } = await SwarmApi.swarmInit({url, form});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}

export const swarmJoin = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const form = ctx.request.body;

    try {
        const { data } = await SwarmApi.swarmJoin({url, form});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}

export const swarmLeave = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const form = ctx.request.body;

    try {
        const { data } = await SwarmApi.swarmLeave(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}


export const getSwarmToken = async ctx => {
    const { endpoint: {url} } = ctx.state.user;

    try {
        const data = await SwarmApi.getSwarmToken(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}


export const getSwarmInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;

    try {
        const { data } = await SwarmApi.getSwarmInspectRaw(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}
