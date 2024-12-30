import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
const User = require("./models/User");
import { IUser } from "./models/User";
import jwt from "jsonwebtoken";
import { serverInfo } from "./serverInfo";
import * as SMTP from "./SMTP";
import dotenv from "dotenv";

const WorkerInstance: SMTP.Worker = new SMTP.Worker(serverInfo);
const router: Router = express.Router();
dotenv.config();
const jwtSecret = process.env.JWT_TOKEN_SECRET!;

// Rota para registrar um novo usuário
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const userExits = await User.findOne({ email });
        if (userExits) {
            res.status(409).send("Email, Usuário ou Password já existentes.");
            return;
        }

        // Criação e registro do novo usuário
        const user = new User({ username, email, password });
        await User.register(user, password);

        // Geração do token JWT para verificação de email
        const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
        const verificationLink = `http://localhost:8080/user/verify/${token}`;

        // Envia email de verificação
        await WorkerInstance.sendMessage({
            from: serverInfo.smtp.auth.user,
            to: email,
            subject: "Verifique sua conta",
            text: `Bem vindo à SportsApplication!
                Clique no link para verificar sua conta: ${verificationLink}`
        });

        res.status(200).send("Registro realizado. Verifique seu email para ativar sua conta.");
    } catch (err) {
        next(err);
    }
});

// Rota para verificar o email
router.get('/verify/:token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, jwtSecret) as { email: string };

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            res.status(400).send("Usuário não encontrado.");
            return;
        }

        user.isVerified = true;
        await user.save();

        res.status(200).send("Conta verificada com sucesso. Você já pode fazer login.");
    } catch (err) {
        next(err);
    }
});

// Rota para login
router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:8080' }), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;

        if (!user.isVerified) {
            res.status(403).send("Verifique seu email antes de fazer login.");
            return;
        }

        res.json({
            status: "ok",
            message: "Login realizado com sucesso!",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

// Rota para alterar o nome de usuário
router.put('/:username/change-username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("Você precisa estar autenticado para alterar o username da sua conta.");
            return;
        }

        const { username } = req.params;
        const { newUsername } = req.body;

        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            res.status(409).send("O nome de usuário já está em uso.");
            return;
        }

        // Atualiza o nome de usuário
        const user = await User.findOneAndUpdate(
            { username },
            { username: newUsername },
            { new: true }
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
    } catch (err) {
        next(err);
    }
});

// Rota para logout
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Logout realizado com sucesso." });
    });
});

// Rota para excluir conta
router.delete('/:username/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("Você precisa estar autenticado para excluir sua conta.");
            return;
        }
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }
        res.status(200).send("Usuário excluído com sucesso.");
    } catch (err) {
        next(err);
    }
});

export default router;
