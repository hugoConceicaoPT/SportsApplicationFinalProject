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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = require("./models/user");
const router = express_1.default.Router();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExits = yield User.findOne({ email });
        if (userExits)
            res.status(400).send("email or password already exists.");
        else {
            const user = new User({ email, password });
            req.session.user_id = user._id.toString();
            yield user.save();
            res.send("ok");
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield User.findAndAuthenticate(email, password);
        if (foundUser) {
            req.session.user_id = foundUser._id.toString();
            res.send("ok");
        }
        else {
            res.send("email or password incorrect");
        }
        console.log(req.session.user_id);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('http://localhost:8080');
    });
});
router.delete('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (validPassword) {
            yield User.deleteOne({ email });
            res.send("ok");
        }
        else {
            res.send("email or password incorrect");
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
