import * as DashboardApi from 'lib/dockerApi/dashboard';
import * as ImageApi from 'lib/dockerApi/image';
import * as NetworkApi from 'lib/dockerApi/network';
import * as VolumeApi from 'lib/dockerApi/volume';

export const getDashboardInfo = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
        try {
            const { info, container } = await DashboardApi.getEndpointInfo(url);
            const image = await ImageApi.getSummaryInfo(url);
            const volume = await VolumeApi.getSummaryInfo(url);
            const network = await NetworkApi.getSummaryInfo(url);
            ctx.status = 200;
            ctx.body = { 
                result: { 
                    info, 
                    summary: {
                        container,
                        image,
                        volume,
                        network
                    }
                }
            };
        } catch(e) {
            ctx.throw(e, 500);
        }
}
