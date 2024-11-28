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
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { id } = req.body;
        const idString = id.tostring();
        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;
        let favorites = yield Favorites.findOne({ email });
        if (!favorites) {
            favorites = new Favorites({
                email,
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
            return res.redirect("http://localhost:8080");
        }
        const { username } = req.params;
        let favorites = yield Favorites.findOne({ username });
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
        const { email } = req.params;
        const { id } = req.body;
        const idString = id.tostring();
        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;
        let favorites = yield Favorites.findOne({ email });
        if (!favorites) {
            res.send("not found");
        }
        else {
            if (isLeague) {
                const result = yield Favorites.findOneAndUpdate({ email }, { $pull: { leagueIds: id } }, { new: true });
                res.send("ok");
            }
            if (isTeam) {
                const result = yield Favorites.findOneAndUpdate({ email }, { $pull: { leagueIds: id } }, { new: true });
                res.send("ok");
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
