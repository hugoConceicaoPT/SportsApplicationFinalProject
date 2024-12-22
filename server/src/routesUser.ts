import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
const User = require("./models/User");
import { IUser } from "./models/user";
import jwt from "jsonwebtoken";
import { serverInfo } from "./serverInfo";
import * as SMTP from "./SMTP";
import dotenv from "dotenv";

const WorkerInstance : SMTP.Worker = new SMTP.Worker(serverInfo);
const router: Router = express.Router();
dotenv.config();
const jwtSecret = process.env.JWT_TOKEN_SECRET!;

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const userExits = await User.findOne({ email });
        if (userExits) res.send("email or password already exists.");
        else {
            const user = new User({ username, email, password });
            await User.register(user, password);

            const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
            const verificationLink = `http://localhost:8080/user/verify/${token}`;
            await WorkerInstance.sendMessage({
                from: serverInfo.smtp.auth.user,
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

router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:8080'}), async (req: Request, res: Response, next: NextFunction) => {
    try {
        try {
            const user = req.user as IUser;
    
            if (!user.isVerified) {
                res.status(403).send("Verifique seu email antes de fazer login.");
                return;
            }
    
            req.logIn(user, (err) => {
                if (err) return next(err);
                res.json({
                    status: 'ok',
                    user: {
                        username: user.username,
                        email: user.email,
                    },
                });
            });
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err); // Encaminha qualquer erro para o middleware de erro
    }
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:8080");
    })
})

router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect("http://localhost:8080");
        }
        await User.deleteOne({ username: res.locals.username })
        res.send("ok");
    }
    catch (err) {
        next(err);
    }
})

export default router;