
export const me = async ctx => {
    const {
        email,
        username
     } = ctx.request.user;

    ctx.body = {
        email,
        username
    };
}