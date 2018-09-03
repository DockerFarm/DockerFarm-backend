import * as EventApi from 'lib/dockerApi/event';
import * as utility from 'lib/utility';
import { assign } from 'lodash';

export const getEvents = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const since = Math.floor((new Date().getTime()- ( 7 * 24 * 60 * 60 * 1000))/1000);
    const until = Math.floor(new Date().getTime()/1000);
    try {
        const data  = await EventApi.getEvents(url, assign({ since, until}, ctx.request.query));
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
