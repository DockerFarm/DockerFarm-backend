import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from 'db/models/User';
import Endpoint from 'db/models/Endpoint';
import request from 'request';
import { objectToQueryString } from 'lib/utility';

export default server => {

    const io = new Server(server);

    io.use(cookieParser);

    io.use(async (socket, next) => {
        const accessToken = get(socket, 'handshake.headers.cookie.accessToken', null);

        if( accessToken ) {
            const { email } = jwt.verify(accessToken, config.jwtSecret);
            const user = await User.findByEmail(email);
            let activeEndpoint = await Endpoint.selectActiveEndpoint({userId: user._id});

            user.endpoint = activeEndpoint; 

            socket.user = user;
            next();
        } else {
            return next(new Error('UnAuthorized'));
        }
    });

    io.on('connection', socket => {

        const { endpoint: { url }} = socket.user;

        socket.on('pull', (data,fn) => {

            const queryString = objectToQueryString(JSON.parse(data)); 

            let req = request({
                method: 'POST',
                uri: `${url}/images/create?${queryString}`
            });

            req.on( 'data', data => {
                socket.emit('pullProgress', data.toString());
            });

            req.on('end', _ => {
                socket.emit('pullEnd');
            })
        });

    })
}