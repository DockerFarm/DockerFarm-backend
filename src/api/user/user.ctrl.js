
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