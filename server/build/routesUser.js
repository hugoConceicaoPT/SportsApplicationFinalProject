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
const passport_1 = __importDefault(require("passport"));
const User = require("./models/user");
const router = express_1.default.Router();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userExits = yield User.findOne({ email });
        if (userExits)
            res.send("email or password already exists.");
        else {
            const user = new User({ username, email, password });
            yield User.register(user, password);
            req.login(user, (err) => {
                if (err)
                    return next(err);
                res.send("ok");
            });
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/login', passport_1.default.authenticate('local', { failureRedirect: 'http://localhost:8080' }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            // Apenas para garantir que a autenticação falha não passe
            res.status(401).json({ status: 'error', message: 'Authentication failed' });
            return next();
        }
        // Sucesso: Envia os dados do usuário logado
        const user = req.user; // Casting para o tipo esperado
        res.json({
            status: 'ok',
            user: {
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        next(err); // Encaminha qualquer erro para o middleware de erro
    }
}));
router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:8080");
    });
});
router.delete('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect("http://localhost:8080");
        }
        yield User.deleteOne({ username: res.locals.username });
        res.send("ok");
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
