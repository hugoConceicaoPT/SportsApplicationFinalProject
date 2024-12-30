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
const routesJogos_1 = __importDefault(require("./routesJogos"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const ws_1 = require("ws");
const leagueIds_1 = require("./leagueIds");
const transformData_1 = require("./transformData");
const User = require('./models/User');
const app = (0, express_1.default)();
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Middleware para analisar solicitações JSON
app.use(express_1.default.json());
// Servir arquivos estáticos das pastas client/public e client/dist
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/public")));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// Conectar ao MongoDB usando a URI das variáveis de ambiente
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});
// Middleware para configurar cabeçalhos CORS e permitir solicitações de origens diferentes
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
// Configuração de gerenciamento de sessões
const sessionConfig = {
    secret: process.env.SECRET, // Chave secreta para assinar o ID da sessão
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
app.use((0, express_session_1.default)(sessionConfig));
// Inicializa o Passport para autenticação
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configura o Passport para usar a estratégia local
passport_1.default.use(new passport_local_1.Strategy(User.authenticate()));
// Serializa as informações do usuário na sessão
passport_1.default.serializeUser(User.serializeUser());
// Desserializa as informações do usuário da sessão
passport_1.default.deserializeUser(User.deserializeUser());
// Define rotas para diferentes funcionalidades
app.use('/user', routesUser_1.default);
app.use('/favorites', routesFavorites_1.default);
app.use('/portugal', routesPortugal_1.default);
app.use('/inglaterra', routesEngland_1.default);
app.use('/equipa', routesEquipas_1.default);
app.use('/jogo', routesJogos_1.default);
app.use('/italia', routesItaly_1.default);
app.use('/alemanha', routesGermany_1.default);
app.use('/franca', routesFrance_1.default);
app.use('/espanha', routesSpain_1.default);
// Inicia o servidor e escuta na porta 8080
exports.server = app.listen(8080);
// Cria um servidor WebSocket em cima do servidor HTTP
const websocket = new ws_1.WebSocketServer({ server: exports.server });
websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");
    // Função para buscar dados de todas as ligas
    const fetchDataForLeagues = () => __awaiter(void 0, void 0, void 0, function* () {
        const results = {};
        // Itera sobre cada ID de liga e busca os dados
        for (const [leagueName, leagueId] of Object.entries(leagueIds_1.leagueIds)) {
            try {
                const response = yield fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                    headers: {
                        "X-API-KEY": process.env.API_KEY,
                    },
                    method: 'GET',
                });
                // Verifica se a resposta é válida
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados para ${leagueName}: ${response.status}`);
                }
                // Analisa a resposta JSON
                const responseData = yield response.json();
                // Ignora ligas sem dados de livescore
                if (!responseData.livescore) {
                    continue;
                }
                // Transforma e armazena os dados de livescore
                const arr = Object.entries(responseData.livescore).map(transformData_1.transformLiveEvents);
                results[leagueId] = arr;
            }
            catch (err) {
                console.error(err);
            }
        }
        return results;
    });
    // Busca e envia dados das ligas na conexão
    fetchDataForLeagues().then((results) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(results)); // Envia os resultados como uma string JSON
        }
    }).catch(error => {
        console.error("Erro ao buscar dados de livescore:", error);
    });
    // Define um intervalo para buscar e enviar dados a cada minuto
    const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield fetchDataForLeagues();
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os resultados como uma string JSON
            }
        }
        catch (error) {
            console.error("Erro ao buscar dados de livescore:", error);
        }
    }), 60000); // Busca dados a cada 1 minuto
    // Limpa o intervalo quando a conexão WebSocket é encerrada
    ws.on("close", () => {
        console.log("Conexão WebSocket encerrada");
        clearInterval(interval);
    });
});
