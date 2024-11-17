const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    } 
});

const User = mongoose.model('User', UserSchema);

export default User;