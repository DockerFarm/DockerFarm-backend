import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from 'middleware';
import authJwt from 'config/passport/jwt';
import db from 'db';
import api from 'api';
import config from 'config';



let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));


// 3rd party middleware
app.use(cors({
	exposedHeaders: config.request.corsHeader
}));

app.use(bodyParser.json({
	limit: config.request.bodyLimit
}));

app.use(middleware({ config }));

app.use(authJwt.initialize());
// api router
app.use('/api', api);

db.sequelize.sync({force : true})
	.then(() => {
		app.server.listen(process.env.PORT || config.context.port, () => {
			console.log(`Started on port ${app.server.address().port}`);
		});
	})

export default app;
