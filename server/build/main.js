"use strict";
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
exports.server = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routesUser_1 = __importDefault(require("./routesUser"));
const routesFavorites_1 = __importDefault(require("./routesFavorites"));
const routesPortugal_1 = __importDefault(require("./routesPortugal"));
const routesEngland_1 = __importDefault(require("./routesEngland"));
const routesEquipas_1 = __importDefault(require("./routesEquipas"));
const routesItaly_1 = __importDefault(require("./routesItaly"));
const routesGermany_1 = __importDefault(require("./routesGermany"));
const routesFrance_1 = __importDefault(require("./routesFrance"));
const routesSpain_1 = __importDefault(require("./routesSpain"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const ws_1 = require("ws");
const leagueIds_1 = require("./leagueIds");
const User = require('./models/User');
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/public")));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        maxAge: 1000 * 60 * 60 * 2
    }
};
app.use((0, express_session_1.default)(sessionConfig));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy(User.authenticate()));
passport_1.default.serializeUser(User.serializeUser());
passport_1.default.deserializeUser(User.deserializeUser());
app.use('/user', routesUser_1.default);
app.use('/favorites', routesFavorites_1.default);
app.use('/portugal', routesPortugal_1.default);
app.use('/inglaterra', routesEngland_1.default);
app.use('/equipa', routesEquipas_1.default);
app.use('/italia', routesItaly_1.default);
app.use('/alemanha', routesGermany_1.default);
app.use('/franca', routesFrance_1.default);
app.use('/espanha', routesSpain_1.default);
exports.server = app.listen(8080);
const websocket = new ws_1.WebSocketServer({ server: exports.server });
websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");
    // Intervalo para fazer requisições e enviar dados
    const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = {};
            for (const [leagueName, leagueId] of Object.entries(leagueIds_1.leagueIds)) {
                try {
                    const responseData = yield fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                        headers: {
                            "X-API-KEY": process.env.API_KEY,
                        },
                        method: 'GET',
                    });
                    if (!responseData.ok) {
                        throw new Error(`Error fetching data for ${leagueName}: ${responseData.status}`);
                    }
                    const responseDataJson = yield responseData.json();
                    results[leagueName] = responseDataJson;
                }
                catch (err) {
                    console.error(err);
                }
            }
            // Verifica se a conexão ainda está ativa antes de enviar
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os dados como string
            }
        }
        catch (error) {
            console.error("Error fetching live score data:", error);
        }
    }), 60000); // Requisição a cada 1 minuto
    // Limpa o intervalo ao desconectar
    ws.on("close", () => {
        console.log("WebSocket connection closed");
        clearInterval(interval);
    });
});
