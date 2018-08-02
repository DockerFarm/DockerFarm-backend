import mongoose from 'mongoose';
import crypto from 'crypto';
import config from 'config';
import EndPoint, { EndPointSchema } from './EndPoint';
const { Schema } = mongoose;

const User = new Schema({
    email: String,
    password: String,
    username: String,
    endpoints: [ EndPointSchema ],
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now    
    },
    social: {
        google: {
            id: String,
            accessToken: String    
        },
        github: {
            id: String,
            accessToken: String 
        }
    }
});

const encryptPassword = password => {
    return crypto.createHmac('sha256', config.sha256Secret).update(password).digest('hex');
};

User.statics.updateEndpoint = async function({
    userId,
    endpointId,
    name,
    url,
    tls
}) {
    const user = await this.findOne({_id: userId}).exec();

    let endpoint = user.endpoints.id(endpointId);

    endpoint.name = name;
    endpoint.url = url;
    endpoint.tls = tls;
    
    return user.save();
}
User.statics.removeEndpoint = async function({
    userId,
    endpointId
}) {
   const user = await this.findOne({_id: userId}).exec();
   user.endpoints.id(endpointId).remove();
   return user.save();
};

User.statics.selectEndpoint = async function({
    url,
    name
}) {
    return this.find().or([{ 'endpoints.url': url}, {'endpoints.name': name }]).exec();
};

User.statics.selectAllEndpoints = async function({
    _id
}) {
    return this.findOne({_id}).select('endpoints').exec();
};

User.statics.addEndpoint = async function({
    _id,
    name,
    url,
    tls
}) {
    let endpoint = new EndPoint({
        name,
        url,
        tls
    });
    
    const user = await this.findOne({ _id }).exec();
    user.endpoints.push(endpoint);

    return user.save();
};

User.statics.localSignup = function({
    email, 
    password,
    username
}) {
    let user = new this({
        email,
        password: encryptPassword(password),
        username
    });
    
    return user.save();
};

User.statics.socialSignup = async function({
    email,
    provider,
    accessToken,
    username,
    socialId
}) {

    let existUser = await this.findByEmail(email);

    if(!existUser) {
        existUser = new this({
            email,
            username,
            social: {
                [provider]: {
                    id: socialId,
                    accessToken: accessToken
                }
            }
        });
    } else {
        existUser.social[provider] = {
            id : socialId,
            accessToken
        };
    }

    return existUser.save();
}

User.statics.findBySocialId = function({
    provider,
    id
}) {
    return this.findOne({ [`social.${provider}.id`]: id }).exec();
}


User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.methods.verifyPassword = function(password) {
    return this.password == encryptPassword(password);
};


export default mongoose.model('User', User);