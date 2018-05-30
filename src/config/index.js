import dotenv from 'dotenv';
import rootPath from 'app-root-path';
import config from 'config/env';

const env = process.env.NODE_ENV || 'dev';

const envMap = {
    'production': '/env/prod.env',
    'dev': '/env/dev.env'
};

const result = dotenv.config({ path: rootPath + envMap[env] });

//dotenv if error
if (result.error)
    throw result.error


export default config(process.env);