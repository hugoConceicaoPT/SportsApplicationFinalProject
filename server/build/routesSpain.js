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
const leagueIds_1 = require("./leagueIds");
const transformData_1 = require("./transformData");
const cachingRoutes_1 = __importDefault(require("./cachingRoutes"));
const router = express_1.default.Router();
// Rota para obter as classificações da La Liga
router.get('/la-liga/classificacoes', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz requisição à API para obter as classificações da liga
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptable.php?l=${leagueIds_1.leagueIds.laLiga}&s=2024-2025`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.table).map(transformData_1.transformLeagueStandings);
        // Retorna os dados transformados como JSON
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter os próximos eventos da La Liga
router.get('/la-liga/lista', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query; // Obtém o parâmetro de data, se fornecido
        // Faz requisição à API para obter os próximos eventos da liga
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds_1.leagueIds.laLiga}`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformData_1.transformNextLastLeagueEvent);
        // Filtra os eventos pela data, se fornecida, ou retorna todos
        if (date) {
            const filteredResults = arr.filter(event => event.dateEvent === date);
            res.json(filteredResults);
        }
        else {
            res.json(arr);
        }
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter os resultados passados da La Liga
router.get('/la-liga/resultados', (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query; // Obtém o parâmetro de data, se fornecido
        // Faz requisição à API para obter os resultados passados da liga
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds_1.leagueIds.laLiga}`);
        const responseData = yield response.json();
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformData_1.transformNextLastLeagueEvent);
        // Filtra os eventos pela data, se fornecida, ou retorna todos
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Exporta o roteador para ser usado em outras partes da aplicação
exports.default = router;
