import * as DashboardApi from 'lib/dockerApi/dashboard';

export const getDashboardInfo = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
        try {
            const data = await DashboardApi.getEndpointInfo(url);
            const imagecount = await DashboardApi.imageCount(url);
            const volumecount = await DashboardApi.volumeCount(url);
            const networkcount = await DashboardApi.networkCount(url);
            ctx.status = 200;
            ctx.body = { result: data, imagecount, volumecount, networkcount };
        } catch(e) {
            ctx.throw(e, 500);
        }
}
