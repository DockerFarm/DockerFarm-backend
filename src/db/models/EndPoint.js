import mongoose from 'mongoose';
const { Schema } = mongoose;

const EndPoint = new Schema({
    url: { type : String },
    name : { type: String },
    tls: { type: Boolean, default: false },
    isActive : { type : Boolean, default: false },
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now    
    }
});

export const EndPointSchema = EndPoint;
export default mongoose.model('EndPoint', EndPoint);