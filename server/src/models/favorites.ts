import { Schema, Document, model } from "mongoose";

interface IFavorites extends Document {
    email: string;
    leagueIds: string [];
    teamIds: string [];
}

const favoritesSchema = new Schema<IFavorites>({
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

module.exports = model('Favorites', favoritesSchema);