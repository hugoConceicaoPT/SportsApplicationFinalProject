"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = (0, mongoose_1.model)('User', UserSchema);
