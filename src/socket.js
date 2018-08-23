import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import { get, reduce } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from 'db/models/User';
import Endpoint from 'db/models/Endpoint';
import { pullImage, buildImage } from 'api/admin/image/image.ctrl';

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
        socket.on('pull', pullImage(socket));
        socket.on('build', buildImage(socket));

    });

}