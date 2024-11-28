"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 15);
        next();
    });
});
userSchema.static('findAndAuthenticate', function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield this.findOne({ email });
        if (!foundUser)
            return false;
        const isValid = yield bcrypt_1.default.compare(password, foundUser.password);
        return isValid ? foundUser : false;
    });
});
module.exports = (0, mongoose_1.model)('User', userSchema);
