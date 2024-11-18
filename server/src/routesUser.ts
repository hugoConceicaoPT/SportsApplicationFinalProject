import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from 'bcrypt';
import User from "./models/user";

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const userExits = await User.findOne({ email });
        if(userExits)  res.send("User with the same email already exists.");
        else {
            const hash = await bcrypt.hash(password,15);
            const user = new User({
                email,
                password: hash
            })
            await user.save();
            res.send("ok");
        }
    }
    catch(err) {
        next(err);
    }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user  = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
            res.send("ok");
        }
        else {
            res.send("email or password incorrect");
        }
    }
    catch(err) {
        next(err);
    }
})


router.delete('/delete', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { email, password } = req.body;
        const user  = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
            await User.deleteOne({ email });
            res.send("ok");
        }
        else {
            res.send("email or password incorrect");
        }
    }
    catch(err){
        next(err);
    }
})

export default router;