import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformNextLastLeagueEvent } from "./transformData";

const router: Router = express.Router();

router.get('/la-liga/classificacoes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueIds.laLiga}&s=2024-2025`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

router.get('/la-liga/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.laLiga}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

router.get('/la-liga/resultados', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.laLiga}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

export default router;