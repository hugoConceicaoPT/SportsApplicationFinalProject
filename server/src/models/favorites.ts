import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
});

const Favorites = mongoose.model("Favorites", FavoritesSchema);

export default Favorites;