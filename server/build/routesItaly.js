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
router.get('/serie-a/classificacoes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield fetch("https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4332&s=2024-2025");
        const responseDataJson = yield responseData.json();
        res.json(responseDataJson);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/serie-a/lista', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=4332`);
        const responseDataJson = yield responseData.json();
        res.json(responseDataJson);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/serie-a/resultados', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=4332`);
        const responseDataJson = yield responseData.json();
        res.json(responseDataJson);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
