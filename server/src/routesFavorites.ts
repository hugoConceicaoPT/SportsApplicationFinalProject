import express, { Request, Response, NextFunction, Router } from "express";
const Favorites = require("./models/favorites");
import { IUser } from "./models/User";

const router: Router = express.Router();

// Regex para validar IDs de ligas e equipas
const leagueIdRegex = /^[0-9]{4}$/; // IDs de ligas têm 4 caracteres numéricos
const teamIdRegex = /^[0-9]{6}$/; // IDs de equipas têm 6 caracteres numéricos

// Rota para adicionar ou remover favoritos
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        if(!req.isAuthenticated()) {
            res.status(401).send("Necessita de estar logado para ver os Favoritos");
        }

        if (!req.user) {
            return;
        }

        const user = req.user as IUser;
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

        let favorites = await Favorites.findOne({ username });

        if (!favorites) {
            // Cria um novo documento de favoritos caso não exista
            favorites = new Favorites({ username });
            await favorites.save();
        }

        if (favorites[updateField]?.includes(idAsString)) {
            // Remove o ID dos favoritos se já estiver presente
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
            // Adiciona o ID aos favoritos se não estiver presente
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
    } catch (err) {
        next(err);
    }
});

// Rota para obter os favoritos de um usuário
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verifica se o usuário está autenticado
        if (!req.isAuthenticated()) {
            res.status(401).send("Necessita de estar logado para ver os Favoritos");
            return;
        }

        if (!req.user) {
            return;
        }

        const user = req.user as IUser;
        const username = user.username;
        let favorites = await Favorites.findOne({ username });

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
    } catch (err) {
        next(err);
    }
});

export default router;
