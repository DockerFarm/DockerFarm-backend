import * as ImageApi from 'lib/dockerApi/image';

export const getImageList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const data = await ImageApi.getImageList(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const data = await ImageApi.getImageInfo({url, id});
        const history = await ImageApi.getImageHistory({url, id});
        ctx.status = 200;
        ctx.body = { result: { data, history } };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getImageInspectRaw = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ImageApi.getImageInspectRaw({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
