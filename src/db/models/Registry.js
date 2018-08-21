import mongoose from 'mongoose';

const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const Registry = new Schema({
    name: { type: String },
    url: { type: String},
    isAuth: { type: Boolean, default: false },
    username: { type: String, default: null },
    password: { type: String, default: null },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now    
    }
})

Registry.statics.addRegistry = function({
    name,
    url,
    isAuth,
    username,
    password,
    userId
}) {
    const registry = new this({
        name,
        url,
        isAuth,
        username,
        password,
        userId
    });

    return registry.save();
}

Registry.statics.selectRegistry = function({
    id,
    userId
}) {
    return this.findOne({_id: new ObjectId(id), userId}).exec();
}


Registry.statics.checkRegistry = function({
    url,
    name, 
    userId,
    registryId
}) {
    return this.find({
                 $and: [
                     { userId: new ObjectId(userId) },
                     { $or: [ {url}, {name}]} ]}
                 )
                .exec();
}


Registry.statics.selectRegistriesByUserId = function({
    userId
}) {
    return this.find({ "userId": new ObjectId(userId) }).exec();
}

Registry.statics.removeRegistry = function({
    _id
}) {
    return this.deleteOne({_id}).exec();
}

Registry.statics.updateRegistry = function({
    _id,
    name,
    url,
    isAuth,
    username,
    password
}) {
    return this.update(
        {_id}, 
        { $set: {
            name,
            url,
            isAuth,
            username,
            password
        }
    }).exec();
}

export default mongoose.model('Registry', Registry);