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
const favorites_1 = __importDefault(require("./models/favorites"));
const router = express_1.default.Router();
router.post('/:email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { leagueID } = req.body;
        let favorites = yield favorites_1.default.findOne({ email });
        if (!favorites) {
            favorites = new favorites_1.default({
                email,
                leagueIds: [leagueID]
            });
            yield favorites.save();
            res.send("ok");
        }
        else {
            if (!favorites.leagueIds.includes(leagueID)) {
                favorites.leagueIds.push(leagueID);
                yield favorites.save();
                res.send("ok");
            }
            res.send("league already in favorites");
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        let favorites = yield favorites_1.default.findOne({ email });
        if (!favorites)
            res.send("not found");
        const leagueIds = yield (favorites === null || favorites === void 0 ? void 0 : favorites.leagueIds);
        res.json(leagueIds);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { leagueID } = req.body;
        let favorites = yield favorites_1.default.findOne({ email });
        if (!favorites) {
            res.send("not found");
        }
        else {
            const result = yield favorites_1.default.findOneAndUpdate({ email }, { $pull: { leagueIds: leagueID } }, { new: true });
            res.send("ok");
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
