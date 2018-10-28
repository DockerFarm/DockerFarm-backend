import Koa from 'koa';
import koaBody from 'koa-body';
import db from 'db';
import api from 'api';
import config from 'config';
import cors from '@koa/cors';
import { passport } from 'config/passport';
import socket from './socket';
import axios from 'axios';

const app = new Koa();


db.connect();

//use koa cors middleware
app.use(cors({
    'origin': config.frontUrl,
    'credentials' : "true"
}));
//use koa body parser middleware
app.use(koaBody());

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    err => {
        throw err.response.data.message
    }
);

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});

app.use(passport.initialize());
app.use(api.routes())
    .use(api.allowedMethods());




const server = app.listen(config.port);

socket(server);
