import dotenv from "dotenv";
import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import routesUser from './routesUser';
import routesFavorites from './routesFavorites';
import routerPortugal from "./routesPortugal";
import routerEngland from "./routesEngland";
import routesEquipas from "./routesEquipas";
import routesItaly from "./routesItaly";
import routesGermany from "./routesGermany";
import routesFrance from "./routesFrance";
import routesSpain from "./routesSpain";
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const User = require ('./models/user');


const app: Express = express();
dotenv.config();
app.use(express.json()); 
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});


app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*"); 
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS"); 
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

const sessionConfig = {
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        expires: new Date (Date.now() + 1000 * 60 * 60 * 2),
        maxAge: 1000 * 60 * 60 * 2
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user',routesUser);
app.use('/favorites', routesFavorites);
app.use('/portugal',routerPortugal);
app.use('/inglaterra', routerEngland);
app.use('/equipa', routesEquipas);
app.use('/italia',routesItaly);
app.use('/alemanha', routesGermany);
app.use('/franca', routesFrance);
app.use('/espanha', routesSpain);


export const server = app.listen(8080);