"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoritesSchema = new mongoose_1.Schema({
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
module.exports = (0, mongoose_1.model)('Favorites', favoritesSchema);
