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
const router = express_1.default.Router();
router.get('/serie-a/classificacoes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptable.php?l=${leagueIds_1.leagueIds.serieA}&s=2024-2025}`);
        const responseData = yield response.json();
        const arr = Object.entries(responseData.table).map(transformData_1.transformLeagueStandings);
        res.json(arr);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/serie-a/lista', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds_1.leagueIds.serieA}`);
        const responseData = yield response.json();
        const arr = Object.entries(responseData.events).map(transformData_1.transformNextLastLeagueEvent);
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/serie-a/resultados', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const response = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds_1.leagueIds.serieA}`);
        const responseData = yield response.json();
        const arr = Object.entries(responseData.events).map(transformData_1.transformNextLastLeagueEvent);
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
