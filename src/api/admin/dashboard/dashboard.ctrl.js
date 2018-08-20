import * as DashboardApi from 'lib/dockerApi/dashboard';
import * as ImageApi from 'lib/dockerApi/image';
import * as NetworkApi from 'lib/dockerApi/network';
import * as VolumeApi from 'lib/dockerApi/volume';

export const getDashboardInfo = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
        try {
            const { info, container, os, status, plugins } = await DashboardApi.getEndpointInfo(url);
            const { docker, api, go, kernel,  ostype, arch } = await DashboardApi.getEngineVersion(url);
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
                    },
                    engine: {
                        version: {
                            docker,
                            api,
                            go,
                            ostype,
                            os,
                            arch,
                        },
                        status,
                        plugins
                    }

                }
            };
        } catch(e) {
            ctx.throw(e, 500);
        }
}
