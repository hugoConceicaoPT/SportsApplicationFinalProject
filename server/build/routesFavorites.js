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
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send("Não autorizado");
}
router.post('/', isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
        }
        const userId = req.user;
        const { id } = req.body;
        const idString = id.tostring();
        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;
        let favorites = yield Favorites.findOne({ userId });
        if (!favorites) {
            favorites = new Favorites({
                userId,
                leagueIds: isLeague ? [idString] : [],
                teamIds: isTeam ? [idString] : [],
            });
            yield favorites.save();
            res.send("ok");
        }
        else {
            if (isLeague) {
                if (!favorites.leagueIds.includes(idString)) {
                    favorites.leagueIds.push(idString);
                }
            }
            if (isTeam) {
                if (!favorites.teamIds.includes(idString)) {
                    favorites.teamIds.push(idString);
                }
            }
            yield favorites.save();
            res.send("ok");
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated()) {
            res.send("Necessita de estar logado para aceder aos favoritos");
        }
        const userId = req.user;
        let favorites = yield Favorites.findOne({ userId });
        if (!favorites)
            res.send("not found");
        const leagueIds = yield (favorites === null || favorites === void 0 ? void 0 : favorites.leagueIds);
        const teamIds = yield (favorites === null || favorites === void 0 ? void 0 : favorites.teamIds);
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
        const userId = req.user;
        const { id } = req.body;
        const idString = id.tostring();
        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;
        let favorites = yield Favorites.findOne({ userId });
        if (!favorites) {
            res.send("not found");
        }
        else {
            if (isLeague) {
                const result = yield Favorites.findOneAndUpdate({ userId }, { $pull: { leagueIds: id } }, { new: true });
                res.send("ok");
            }
            if (isTeam) {
                const result = yield Favorites.findOneAndUpdate({ userId }, { $pull: { leagueIds: id } }, { new: true });
                res.send("ok");
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
