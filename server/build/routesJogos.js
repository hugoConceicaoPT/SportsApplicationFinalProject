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
// Rota para obter estatísticas de um evento pelo ID
router.get("/estatisticas/:id", (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter estatísticas do evento
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookupeventstats.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Verifica se as estatísticas foram encontradas
        if (!responseData.eventstats) {
            res.status(404).json({ message: "Estatísticas não encontradas." });
            return;
        }
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.eventstats).map(transformData_1.transformEventStatistics);
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter a formação de um evento pelo ID
router.get("/formacao/:id", (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter a formação do evento
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuplineup.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Verifica se a formação foi encontrada
        if (!responseData.lineup) {
            res.status(404).json({ message: "Formação não encontrada." });
            return;
        }
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.lineup).map(transformData_1.transformEventLineup);
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
// Rota para obter o timeline de um evento pelo ID
router.get("/timeline/:id", (0, cachingRoutes_1.default)(120), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faz a requisição à API para obter o timeline do evento
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptimeline.php?id=${req.params.id}`);
        const responseData = yield response.json();
        // Verifica se o timeline foi encontrado
        if (!responseData.timeline) {
            res.status(404).json({ message: "Timeline não encontrada." });
            return;
        }
        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.timeline).map(transformData_1.transformEventTimeline);
        res.json(arr);
    }
    catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
}));
exports.default = router;
