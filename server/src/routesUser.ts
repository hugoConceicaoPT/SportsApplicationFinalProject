import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from 'bcrypt';
const User = require("./models/user");

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userExits = await User.findOne({ email });
        if (userExits) res.status(400).send("email or password already exists.");
        else {
            const user = new User({ email,password });
            req.session.user_id = user._id.toString();
            await user.save();
            res.send("ok");
        }
    }
    catch (err) {
        next(err);
    }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findAndAuthenticate(email, password);
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
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(() => {
        res.redirect('http://localhost:8080');
    });
})

router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            await User.deleteOne({ email });
            res.send("ok");
        }
        else {
            res.send("email or password incorrect");
        }
    }
    catch (err) {
        next(err);
    }
})

export default router;