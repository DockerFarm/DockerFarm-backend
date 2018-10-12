import * as TaskApi from 'lib/dockerApi/task';

export const getTaskList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const  data = await TaskApi.getTaskList({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e);
        ctx.throw(e, 500);
    }
}

export const getTaskLog = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    const { id } = ctx.params;

	try {
		const data = await TaskApi.getTaskLog({
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

export const getTaskInfo = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const  data = await TaskApi.getTaskInfo({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
