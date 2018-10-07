import * as ServiceApi from 'lib/dockerApi/service';


export const getServiceList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const  data = await ServiceApi.getServiceList(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getServiceInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const data = await ServiceApi.getServiceInfo({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getServiceLog = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    const { id } = ctx.params;

	try {
		const data = await ServiceApi.getServiceLog({
			url,
			id,
			query: ctx.request.query
		});

        ctx.status = 200;
        ctx.body = { result: data };
	} catch(e) {
        ctx.throw(e, 500);
	}
}

export const deleteService = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ServiceApi.deleteService({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
