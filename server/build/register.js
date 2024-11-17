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
const mongoose_1 = __importStar(require("mongoose"));
// Esquema do MongoDB
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Modelo do MongoDB
const User = mongoose_1.default.model("User", userSchema);
// Roteador do Express
const router = express_1.default.Router();
router.post("/register", (req, res) => {
    // Usando uma promessa explícita
    new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            // Verifica se os campos obrigatórios estão presentes
            if (!name || !email || !password) {
                res.status(400).json({ message: "Todos os campos são obrigatórios" });
                resolve(undefined); // Resolva explicitamente a promessa
                return;
            }
            // Verifica se o e-mail já existe
            const existingUser = yield User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "O email já está registado" });
                resolve(undefined); // Resolva explicitamente a promessa
                return;
            }
            // Cria um novo usuário e salva no banco
            const newUser = new User({ name, email, password });
            yield newUser.save();
            res.status(201).json({ message: "Utilizador registado com sucesso", user: newUser });
            resolve(undefined); // Resolva explicitamente a promessa
        }
        catch (err) {
            res.status(500).json({ message: "Erro no servidor. Tente novamente mais tarde." });
            reject(err); // Rejeite a promessa em caso de erro
        }
    }));
});
exports.default = router;
