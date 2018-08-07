import * as ContainerApi from 'lib/dockerApi/container';

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


export const startContainer = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;
    
    try {
        const { data } = await ContainerApi.startContainer({url, id});
        ctx.status = 200;
        ctx.body = { result: data};
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const stopContainer = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;
    
    try {
        const { data } = await ContainerApi.stopContainer({url, id});
        ctx.status = 200;
        ctx.body = { result: data};
    } catch(e) {
        ctx.throw(e, 500);
    }
}
