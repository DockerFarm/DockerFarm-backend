import * as DashboardApi from 'lib/dockerApi/dashboard';
import * as ImageApi from 'lib/dockerApi/image';
import * as NetworkApi from 'lib/dockerApi/network';
import * as VolumeApi from 'lib/dockerApi/volume';

export const getDashboardInfo = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
        try {
            const data = await DashboardApi.getEndpointInfo(url);
            const imagecount = await ImageApi.imageCount(url);
            const volumecount = await VolumeApi.volumeCount(url);
            const networkcount = await NetworkApi.networkCount(url);
            ctx.status = 200;
            ctx.body = { result: data, imagecount, volumecount, networkcount };
        } catch(e) {
            ctx.throw(e, 500);
        }
}
