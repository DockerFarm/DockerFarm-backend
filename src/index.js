import Koa from 'koa';
import koaBody from 'koa-body';
import db from 'db';
import api from 'api';
import config from 'config';
import cors from '@koa/cors';
import tokenCheck from 'lib/middleware/tokenCheck';
import { passport } from 'config/passport';

const app = new Koa();

db.connect();
//use koa cors middleware
app.use(cors());
//use koa body parser middleware
app.use(koaBody());

app.use(passport.initialize());
app.use(api.routes())
    .use(api.allowedMethods());



app.listen(config.port);