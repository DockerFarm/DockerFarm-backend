import jwt from 'jsonwebtoken';
import config from 'config';

export default obj => {
    return jwt.sign(obj, config.jwtSecret, { expiresIn : '1h'});
}