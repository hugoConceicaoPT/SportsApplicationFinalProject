import { Schema, Document, model, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
    email: string;
    password: string;
}

interface IUserMethods extends Model<IUser> {
    findAndAuthenticate(email: string, password: string): Promise<IUser | false>;
}

type UserModel = Model<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    email: { 
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank'],
        unique: true,
    } 
});

userSchema.pre<IUser>("save", async function(this: IUser ,next) {
    this.password = await bcrypt.hash(this.password, 15);
    next();
});

userSchema.static('findAndAuthenticate', async function (email : string, password : string) : Promise<IUser | false> {
    const foundUser = await this.findOne({ email });
    if(!foundUser) return false;
    const isValid = await bcrypt.compare(password,foundUser.password);
    return isValid ? foundUser : false;
});

module.exports = model('User', userSchema);