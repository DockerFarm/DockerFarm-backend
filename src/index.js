import Koa from 'koa';
import koaBody from 'koa-body';
import db from 'db';
import api from 'api';
import config from 'config';
import cors from '@koa/cors';
import { passport } from 'config/passport';
import socket from './socket';

const app = new Koa();


db.connect();

//use koa cors middleware
app.use(cors({
    'origin':'http://dockerfarm.io',
    'credentials' : "true"
}));
//use koa body parser middleware
app.use(koaBody());

app.use(passport.initialize());
app.use(api.routes())
    .use(api.allowedMethods());




const server = app.listen(config.port);

socket(server);
