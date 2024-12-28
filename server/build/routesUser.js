"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const User = require("./models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serverInfo_1 = require("./serverInfo");
const SMTP = __importStar(require("./SMTP"));
const dotenv_1 = __importDefault(require("dotenv"));
const WorkerInstance = new SMTP.Worker(serverInfo_1.serverInfo);
const router = express_1.default.Router();
dotenv_1.default.config();
const jwtSecret = process.env.JWT_TOKEN_SECRET;
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userExits = yield User.findOne({ email });
        if (userExits)
            res.send("email or password already exists.");
        else {
            const user = new User({ username, email, password });
            yield User.register(user, password);
            const token = jsonwebtoken_1.default.sign({ email }, jwtSecret, { expiresIn: "1h" });
            const verificationLink = `http://localhost:8080/user/verify/${token}`;
            yield WorkerInstance.sendMessage({
                from: serverInfo_1.serverInfo.smtp.auth.user,
                to: email,
                subject: "Verifique sua conta",
                text: `Bem vindo à SportsApplication!
                Clique no link para verificar sua conta: ${verificationLink}`
            });
            res.status(200).send("Registro realizado. Verifique seu email para ativar sua conta.");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Rota para verificar o email
router.get('/verify/:token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield User.findOne({ email: decoded.email });
        if (!user) {
            res.status(400).send("Usuário não encontrado.");
            return;
        }
        user.isVerified = true;
        yield user.save();
        res.status(200).send("Conta verificada com sucesso. Você já pode fazer login.");
    }
    catch (err) {
        next(err);
    }
}));
router.post('/login', passport_1.default.authenticate('local', { failureRedirect: 'http://localhost:8080' }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const user = req.user;
            if (!user.isVerified) {
                res.status(403).send("Verifique seu email antes de fazer login.");
                return;
            }
            res.json({
                status: 'ok',
                user: {
                    username: user.username,
                    email: user.email,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    catch (err) {
        next(err); // Encaminha qualquer erro para o middleware de erro
    }
}));
router.put('/:username/change-username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Authenticated:", req.isAuthenticated());
        if (!req.isAuthenticated()) {
            res.status(401).send("Você precisa estar autenticado para alterar o username da sua conta.");
            return;
        }
        const { username } = req.params;
        const { newUsername } = req.body;
        console.log(req.body);
        const existingUser = yield User.findOne({ username: newUsername });
        if (existingUser) {
            res.status(409).send("O nome de usuário já está em uso.");
            return;
        }
        // Atualiza o nome de usuário
        const user = yield User.findOneAndUpdate({ username }, // Condição de busca
        { username: newUsername }, // Atualização
        { new: true } // Retorna o documento atualizado
        );
        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).send("Username alterado com sucesso.");
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Logout realizado com sucesso." });
    });
});
router.delete('/:username/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("Você precisa estar autenticado para excluir sua conta.");
            return;
        }
        const { username } = req.params;
        const user = yield User.findOneAndDelete({ username });
        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }
        res.status(200).send("Usuário excluído com sucesso.");
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
