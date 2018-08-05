import mongoose from 'mongoose';
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;
const EndPoint = new Schema({
    url: { type : String, unique: true },
    name : { type: String, unique: true },
    tls: { type: Boolean, default: false },
    isActive : { type : Boolean, default: false },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now    
    }
});

EndPoint.statics.addEndpoint = function({
    url,
    tls,
    name,
    isActive,
    userId
}) {
    const endpoint = new this({
        url,
        tls,
        name,
        isActive,
        userId
    });

    return endpoint.save();
}

EndPoint.statics.selectEndpointsByUserId = function({
    userId
}) {
    return this.find({ "userId": new ObjectId(userId) }).exec();
}

EndPoint.statics.removeEndpoint = function({
    _id
}) {
    return this.deleteOne({_id}).exec();
}

EndPoint.statics.updateEndpoint = function({
    _id,
    tls,
    name,
    isActive,
    url
}) {
    return this.update(
        {_id}, 
        { $set: {
            tls,
            name,
            isActive,
            url
        }
    }).exec();
}

EndPoint.statics.unActiveAll = function() {
    return this.update({}, {isActive: false}, {multi: true}).exec();
}

export default mongoose.model('EndPoint', EndPoint);