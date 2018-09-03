import * as EventApi from 'lib/dockerApi/event';
import * as utility from 'lib/utility';

export const getEvents = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const sinceTime = utility.getUnixTimeStamp(ctx.state.user.createdAt);
    const untilTime = Math.floor(new Date().getTime()/1000);
    try {
        const data  = await EventApi.getEvents(url, sinceTime, untilTime);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
