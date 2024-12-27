import express, { Request, Response, NextFunction, Router } from "express";
const Favorites = require("./models/favorites");
import { IUser } from "./models/User";

const router: Router = express.Router();

const leagueIdRegex = /^[0-9]{4}$/; // IDs de ligas têm 4 caracteres alfabéticos
const teamIdRegex = /^[0-9]{6}$/; // IDs de equipas têm 6 caracteres alfanuméricos

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
        }
        const user = req.user as IUser
        const username = user.username
        const {id} = req.body;
        const {badge} = req.body;
        const {name} = req.body;

        const badgeAsString = String(badge);
        const nameAsString = String(name);
        const idAsString = String(id); // Garante que o ID é uma string
        const isLeague = leagueIdRegex.test(idAsString);
        const isTeam = teamIdRegex.test(idAsString);

        if(!isLeague && !isTeam) {
            res.send("ID inválido");
        }

        const updateField = isLeague ? "leagueIds" : "teamIds";
        const updateFieldBadge = isLeague ? "leagueBadge" : "teamBadge";
        const updateFieldName = isLeague ? "leagueName" : "teamName";

        let favorites = await Favorites.findOne({ username });

        if (!favorites) {
            // Cria um novo documento de favoritos se não existir
            favorites = new Favorites({ username });
            await favorites.save();
        }

        if (favorites[updateField]?.includes(idAsString)) {
            // Se o ID já estiver nos favoritos, remove-o
            await Favorites.findOneAndUpdate(
                { username },
                { $pull: { [updateField]: idAsString } },
                { new: true }
            );
            await Favorites.findOneAndUpdate(
                { username },
                { $pull: { [updateFieldName]: nameAsString } },
                { new: true }
            );
            await Favorites.findOneAndUpdate(
                { username },
                { $pull: { [updateFieldBadge]: badgeAsString } },
                { new: true }
            );
            res.send("removed");
        } else {
            // Caso contrário, adiciona o ID
            await Favorites.findOneAndUpdate(
                { username },
                { $addToSet: { [updateField]: idAsString } },
                { new: true }
            );
            await Favorites.findOneAndUpdate(
                { username },
                { $addToSet: { [updateFieldName]: nameAsString } },
                { new: true }
            );
            await Favorites.findOneAndUpdate(
                { username },
                { $addToSet: { [updateFieldBadge]: badgeAsString } },
                { new: true }
            );
            res.send("added");
        }
    }
    catch(err) {
        next(err);
    }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        if(!req.isAuthenticated()) {
            res.status(401).send("Necessita de estar logado para ver os Favoritos");
        }
        const user = req.user as IUser
        const username = user.username
        let favorites = await Favorites.findOne({ username });

        if(!favorites) {
            res.status(404).send("Não existem favoritos");
        }

        const leagueIds = favorites.leagueIds || [];
        const leagueName = favorites.leagueName || [];
        const leagueBadge = favorites.leagueBadge || [];
        const teamIds = favorites.teamIds || [];
        const teamName = favorites.teamName || [];
        const teamBadge = favorites.teamBadge || [];
        res.json({leagueIds, leagueName, leagueBadge, teamIds, teamName, teamBadge});
    }
    catch(err) {
        next(err);
    }
})




export default router;