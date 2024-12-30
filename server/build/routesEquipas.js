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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cachingRoutes_1 = __importDefault(require("./cachingRoutes"));
const transformData_1 = require("./transformData");
// Rota para obter os próximos eventos de uma equipe por ID
router.get('/:id/lista', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter os próximos eventos
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformData_1.transformNextLastLeagueEvent);
        // Retorna os dados transformados como resposta
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter os resultados passados de uma equipe por ID
router.get('/:id/resultados', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter os resultados passados
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventslast.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.results).map(transformData_1.transformNextLastLeagueEvent);
        // Retorna os dados transformados como resposta
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter os detalhes de uma equipe por ID
router.get('/:id/detalhes', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter os detalhes da equipe
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookupteam.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.teams).map(transformData_1.transformTeamDetails);
        // Retorna os dados transformados como resposta
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Exporta o roteador para uso em outras partes da aplicação
exports.default = router;
