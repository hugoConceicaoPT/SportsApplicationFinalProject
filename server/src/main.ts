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

const app: Express = express();

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Middleware para analisar solicitações JSON
app.use(express.json());

// Servir arquivos estáticos das pastas client/public e client/dist
app.use("/", express.static(path.join(__dirname, "../../client/public")));
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

// Conectar ao MongoDB usando a URI das variáveis de ambiente
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});

// Middleware para configurar cabeçalhos CORS e permitir solicitações de origens diferentes
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

// Configuração de gerenciamento de sessões
const sessionConfig = {
    secret: process.env.SECRET!, // Chave secreta para assinar o ID da sessão
    resave: false, // Evita salvar sessões se não forem modificadas
    saveUninitialized: false, // Evita salvar sessões não inicializadas
    cookie: {
        httpOnly: true, // Impede que scripts do lado do cliente acessem os cookies
        secure: false, // Define como true em produção ao usar HTTPS
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2), // Expira em 2 horas
        maxAge: 1000 * 60 * 60 * 2 // Tempo máximo de vida: 2 horas
    }
};

// Adiciona o middleware de sessões
app.use(session(sessionConfig));

// Inicializa o Passport para autenticação
app.use(passport.initialize());
app.use(passport.session());

// Configura o Passport para usar a estratégia local
passport.use(new LocalStrategy(User.authenticate()));

// Serializa as informações do usuário na sessão
passport.serializeUser(User.serializeUser());

// Desserializa as informações do usuário da sessão
passport.deserializeUser(User.deserializeUser());

// Define rotas para diferentes funcionalidades
app.use('/user', routesUser);
app.use('/favorites', routesFavorites);
app.use('/portugal', routerPortugal);
app.use('/inglaterra', routerEngland);
app.use('/equipa', routesEquipas);
app.use('/jogo', routesJogos);
app.use('/italia', routesItaly);
app.use('/alemanha', routesGermany);
app.use('/franca', routesFrance);
app.use('/espanha', routesSpain);

// Inicia o servidor e escuta na porta 8080
export const server = app.listen(8080);

// Cria um servidor WebSocket em cima do servidor HTTP
const websocket = new WebSocketServer({ server });

websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");

    // Função para buscar dados de todas as ligas
    const fetchDataForLeagues = async () => {
        const results: Record<string, any> = {};

        // Itera sobre cada ID de liga e busca os dados
        for (const [leagueName, leagueId] of Object.entries(leagueIds)) {
            try {
                const response = await fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                    headers: {
                        "X-API-KEY": process.env.API_KEY!,
                    },
                    method: 'GET',
                });

                // Verifica se a resposta é válida
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados para ${leagueName}: ${response.status}`);
                }

                // Analisa a resposta JSON
                const responseData = await response.json();

                // Ignora ligas sem dados de livescore
                if (!responseData.livescore) {
                    continue;
                }

                // Transforma e armazena os dados de livescore
                const arr = Object.entries(responseData.livescore).map(transformLiveEvents);
                results[leagueId] = arr;
            } catch (err) {
                console.error(err);
            }
        }
        return results;
    };

    // Busca e envia dados das ligas na conexão
    fetchDataForLeagues().then((results) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(results)); // Envia os resultados como uma string JSON
        }
    }).catch(error => {
        console.error("Erro ao buscar dados de livescore:", error);
    });

    // Define um intervalo para buscar e enviar dados a cada minuto
    const interval = setInterval(async () => {
        try {
            const results = await fetchDataForLeagues();
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os resultados como uma string JSON
            }
        } catch (error) {
            console.error("Erro ao buscar dados de livescore:", error);
        }
    }, 60000); // Busca dados a cada 1 minuto

    // Limpa o intervalo quando a conexão WebSocket é encerrada
    ws.on("close", () => {
        console.log("Conexão WebSocket encerrada");
        clearInterval(interval);
    });
});
