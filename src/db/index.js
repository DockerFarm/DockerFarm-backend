import mongoose from 'mongoose';
import config from 'config';
import logger from '../lib/logger';

export default {
    connect() {
        return mongoose.connect(config.mongoUrl, { 
            useNewUrlParser: true,
            reconnectInterval: 10000,
            reconnectTries: Number.MAX_VALUE
        })
                .then( result => {
                    logger.info('Database Connect Success');
                })
                .catch( e => {
                    logger.error(e.message);
                })
    },
    disconnect() {
        return mongoose.disconnect();
    } 
};