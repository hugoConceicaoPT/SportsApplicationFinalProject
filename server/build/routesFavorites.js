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
// Regex para validar IDs de ligas e equipas
const leagueIdRegex = /^[0-9]{4}$/; // IDs de ligas têm 4 caracteres numéricos
const teamIdRegex = /^[0-9]{6}$/; // IDs de equipas têm 6 caracteres numéricos
// Rota para adicionar ou remover favoritos
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Verifica se o usuário está autenticado
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
            return;
        }
        if (!req.user) {
            return;
        }
        const user = req.user;
        const username = user.username;
        const { id, badge, name } = req.body;
        const badgeAsString = String(badge);
        const nameAsString = String(name);
        const idAsString = String(id); // Garante que o ID é uma string
        const isLeague = leagueIdRegex.test(idAsString);
        const isTeam = teamIdRegex.test(idAsString);
        // Valida o ID fornecido
        if (!isLeague && !isTeam) {
            res.send("ID inválido");
            return;
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
        });
        const updateField = isLeague ? "leagueIds" : "teamIds";
        const updateFieldBadge = isLeague ? "leagueBadge" : "teamBadge";
        const updateFieldName = isLeague ? "leagueName" : "teamName";
        let favorites = yield Favorites.findOne({ username });
        if (!favorites) {
            // Cria um novo documento de favoritos caso não exista
            favorites = new Favorites({ username });
            yield favorites.save();
        }
        if ((_a = favorites[updateField]) === null || _a === void 0 ? void 0 : _a.includes(idAsString)) {
            // Remove o ID dos favoritos se já estiver presente
            yield Favorites.findOneAndUpdate({ username }, { $pull: { [updateField]: idAsString } }, { new: true });
            yield Favorites.findOneAndUpdate({ username }, { $pull: { [updateFieldName]: nameAsString } }, { new: true });
            yield Favorites.findOneAndUpdate({ username }, { $pull: { [updateFieldBadge]: badgeAsString } }, { new: true });
            res.send("removed");
        }
        else {
            // Adiciona o ID aos favoritos se não estiver presente
            yield Favorites.findOneAndUpdate({ username }, { $addToSet: { [updateField]: idAsString } }, { new: true });
            yield Favorites.findOneAndUpdate({ username }, { $addToSet: { [updateFieldName]: nameAsString } }, { new: true });
            yield Favorites.findOneAndUpdate({ username }, { $addToSet: { [updateFieldBadge]: badgeAsString } }, { new: true });
            res.send("added");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Rota para obter os favoritos de um usuário
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica se o usuário está autenticado
        if (!req.isAuthenticated()) {
            res.status(401).send("Necessita de estar logado para ver os Favoritos");
            return;
        }
        if (!req.user) {
            return;
        }
        const user = req.user;
        const username = user.username;
        let favorites = yield Favorites.findOne({ username });
        if (!favorites) {
            res.status(404).send("Não existem favoritos");
            return;
        }
        // Organiza os favoritos em campos distintos
        const leagueIds = favorites.leagueIds || [];
        const leagueName = favorites.leagueName || [];
        const leagueBadge = favorites.leagueBadge || [];
        const teamIds = favorites.teamIds || [];
        const teamName = favorites.teamName || [];
        const teamBadge = favorites.teamBadge || [];
        // Retorna os favoritos como JSON
        res.json({ leagueIds, leagueName, leagueBadge, teamIds, teamName, teamBadge });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
