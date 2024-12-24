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
import routesJogos from './routesJogos';
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { WebSocketServer } from "ws";
import { leagueIds } from "./leagueIds";
import { transformLiveEvents } from "./transformData";
const User = require('./models/User');
type LeagueName = keyof typeof leagueIds;

const app: Express = express();
dotenv.config();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client/public")));
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
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        maxAge: 1000 * 60 * 60 * 2
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user', routesUser);
app.use('/favorites', routesFavorites);
app.use('/portugal', routerPortugal);
app.use('/inglaterra', routerEngland);
app.use('/equipa', routesEquipas);
app.use('/jogo', routesJogos)
app.use('/italia', routesItaly);
app.use('/alemanha', routesGermany);
app.use('/franca', routesFrance);
app.use('/espanha', routesSpain);


export const server = app.listen(8080);


const websocket = new WebSocketServer({ server });

websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");

    // Função para buscar os dados das ligas
    const fetchDataForLeagues = async () => {
        const results: Record<string, any> = {};

        for (const [leagueName, leagueId] of Object.entries(leagueIds)) {
            try {
                const response = await fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                    headers: {
                        "X-API-KEY": process.env.API_KEY!,
                    },
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Error fetching data for ${leagueName}: ${response.status}`);
                }
                const responseData = await response.json();
                if (!responseData.livescore) {
                    continue; // Skip this league if no livescore data
                }
                const arr = Object.entries(responseData.livescore).map(transformLiveEvents);
                results[leagueId] = arr;
            }
            catch (err) {
                console.error(err);
            }
        }
        return results;
    };

    // Envia os dados imediatamente após a conexão
    fetchDataForLeagues().then((results) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(results)); // Envia os dados como string
        }
    }).catch(error => {
        console.error("Error fetching live score data:", error);
    });

    // Intervalo para fazer requisições e enviar dados a cada 1 minuto
    const interval = setInterval(async () => {
        try {
            const results = await fetchDataForLeagues();
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os dados como string
            }
        } catch (error) {
            console.error("Error fetching live score data:", error);
        }
    }, 60000); // Requisição a cada 1 minuto

    // Limpa o intervalo ao desconectar
    ws.on("close", () => {
        console.log("WebSocket connection closed");
        clearInterval(interval);
    });
});