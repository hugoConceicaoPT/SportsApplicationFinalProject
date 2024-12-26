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
const Favorites = require("./models/favorites");
const router = express_1.default.Router();
const leagueIdRegex = /^[0-9]{4}$/; // IDs de ligas têm 4 caracteres alfabéticos
const teamIdRegex = /^[0-9]{7}$/; // IDs de equipas têm 7 caracteres alfanuméricos
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
        }
        const user = req.user;
        const username = user.username;
        const { id } = req.body;
        Number(id);
        const isLeague = leagueIdRegex.test(id);
        const isTeam = teamIdRegex.test(id);
        if (!isLeague && !isTeam) {
            res.send("ID inválido");
        }
        const update = Object.assign(Object.assign({}, (isLeague && { $addToSet: { leagueIds: id } })), (isTeam && { $addToSet: { teamIds: id } }));
        const favorites = yield Favorites.findOneAndUpdate({ username }, Object.assign({ $setOnInsert: { username } }, update), // Cria o documento se não existir
        { upsert: true, new: true } // Atualiza ou insere
        );
        res.send("ok");
    }
    catch (err) {
        next(err);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para ver os Favoritos");
        }
        const user = req.user;
        const username = user.username;
        let favorites = yield Favorites.findOne({ username });
        if (!favorites)
            res.send("not found");
        const leagueIds = favorites.leagueIds || [];
        const teamIds = favorites.teamIds || [];
        res.json({ leagueIds, teamIds });
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para apagar dos Favoritos");
        }
        const user = req.user;
        const username = user.username;
        const { id } = req.body;
        Number(id);
        const isLeague = leagueIdRegex.test(id);
        const isTeam = teamIdRegex.test(id);
        let favorites = yield Favorites.findOne({ username });
        if (!favorites) {
            res.send("not found");
        }
        else {
            if (isLeague) {
                const result = yield Favorites.findOneAndUpdate({ username }, { $pull: { leagueIds: id } }, { new: true });
                res.send("ok");
            }
            if (isTeam) {
                const result = yield Favorites.findOneAndUpdate({ username }, { $pull: { teamIds: id } }, { new: true });
                res.send("ok");
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
