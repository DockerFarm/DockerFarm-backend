import User from 'db/models/User';
import ping from 'lib/ping';

export const me = async ctx => {
    const {
        email,
        username
     } = ctx.state.user;

    ctx.body = {
        email,
        username
    };
}

