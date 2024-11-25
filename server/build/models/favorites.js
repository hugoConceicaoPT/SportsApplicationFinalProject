"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const FavoritesSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email cannot be blank"],
        unique: true,
    },
    leagueIds: {
        type: [String],
        default: [],
    },
    teamIds: {
        type: [String],
        default: [],
    }
});
const Favorites = mongoose_1.default.model("Favorites", FavoritesSchema);
exports.default = Favorites;
