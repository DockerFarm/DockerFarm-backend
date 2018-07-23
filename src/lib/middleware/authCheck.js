export default () => 
    (ctx, next) => {
        const { user } = ctx.request;

        if (!user) {
            ctx.status = 401;
            return;
        }
        
        next();
}