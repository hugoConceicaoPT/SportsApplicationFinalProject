import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
const User = require ("./models/user");
import { IUser } from "./models/user";

const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        const user = req.user as IUser;
        res.locals.username = user.username; 
    } 
    next();
})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const userExits = await User.findOne({ email });
        if (userExits) res.send("email or password already exists.");
        else {
            const user = new User({ username,email,password });
            await User.register(user,password);
            req.login(user, (err) => {  
                if(err) return next(err);
            });
            res.send("ok");
        }
    }
    catch (err) {
        next(err);
    }
})

router.post('/login', passport.authenticate('local', {failureRedirect: 'http://localhost:8080'}) , async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        status: "ok",
        user: req.user
    });
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout( function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:8080");
    })
})

router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.isAuthenticated()) {
            return res.redirect("http://localhost:8080");
        }
        await User.deleteOne( { username: res.locals.username})
        res.send("ok");
    }
    catch (err) {
        next(err);
    }
})

export default router;