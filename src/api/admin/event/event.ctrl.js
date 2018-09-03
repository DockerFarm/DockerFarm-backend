import * as EventApi from 'lib/dockerApi/event';
import * as utility from 'lib/utility';

export const getEvents = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const sinceTime = Math.floor((new Date().getTime()- ( 7 * 24 * 60 * 60 * 1000))/1000);
    const untilTime = Math.floor(new Date().getTime()/1000);
    const params = ctx.params;
    try {
        const data  = await EventApi.getEvents(url, sinceTime, untilTime params);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
