import express, { Request, Response, NextFunction, Router } from "express";
const Favorites = require("./models/favorites");
import { IUser } from "./models/user";

const router: Router = express.Router();

const leagueIdRegex = /^[0-9]{4}$/; // IDs de ligas têm 4 caracteres alfabéticos
const teamIdRegex = /^[0-9]{7}$/; // IDs de equipas têm 7 caracteres alfanuméricos

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
        }
        const user = req.user as IUser
        const username = user.username
        const {id} = req.body;

        const idAsString = String(id); // Garante que o ID é uma string
        const isLeague = leagueIdRegex.test(idAsString);
        const isTeam = teamIdRegex.test(idAsString);

        if(!isLeague && !isTeam) {
            res.send("ID inválido");
        }

        const updateField = isLeague ? "leagueIds" : "teamIds";

        const favorites = await Favorites.findOne({ username });

        if (favorites && favorites[updateField]?.includes(idAsString)) {
            // Se o ID já estiver nos favoritos, remove-o
            await Favorites.findOneAndUpdate(
                { username },
                { $pull: { [updateField]: idAsString } },
                { new: true }
            );
        } else {
            // Caso contrário, adiciona o ID
            await Favorites.findOneAndUpdate(
                { username },
                { $addToSet: { [updateField]: idAsString } },
                { upsert: true, new: true } // Cria o documento se não existir
            );
        }
        res.send("ok");
    }
    catch(err) {
        next(err);
    }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para ver os Favoritos");
        }
        const user = req.user as IUser
        const username = user.username
        let favorites = await Favorites.findOne({ username });

        if(!favorites) res.send("not found");

        const leagueIds = favorites.leagueIds || [];
        const teamIds = favorites.teamIds || [];
        res.json({leagueIds, teamIds});
    }
    catch(err) {
        next(err);
    }
});


router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para apagar dos Favoritos");
        }
        const user = req.user as IUser
        const username = user.username
        const {id} = req.body;

        String(id);

        const isLeague = leagueIdRegex.test(id);
        const isTeam = teamIdRegex.test(id);

        
        let favorites = await Favorites.findOne({ username });

        if(!favorites){
            res.send("not found");
        }
        else{
            if(isLeague){
                const result = await Favorites.findOneAndUpdate(
                    { username }, 
                    { $pull: { leagueIds: id } },
                    { new: true }
                );
                res.send("ok")
            }
            if(isTeam){
                const result = await Favorites.findOneAndUpdate(
                    { username }, 
                    { $pull: { teamIds: id } },
                    { new: true }
                );
                res.send("ok")
            }
        }   
    }
    catch(err) {
        next(err);
    }
})

export default router;