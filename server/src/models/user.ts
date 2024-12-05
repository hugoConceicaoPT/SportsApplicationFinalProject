import { Schema, Document, model, Model } from "mongoose";
const passportLocalMongoose = require('passport-local-mongoose');

export interface IUser extends Document {
    _id: string;
    email: string;
    username: string;
}


const UserSchema = new Schema<IUser>({
    username: { 
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    },
    email: { 
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = model('User', UserSchema);