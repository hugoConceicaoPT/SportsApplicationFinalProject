import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformNextLastLeagueEvent } from "./transformData";

const router: Router = express.Router();

router.get('/serie-a/classificacoes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueIds.serieA}&s=2024-2025`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

router.get('/serie-a/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.serieA}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

router.get('/serie-a/resultados', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.serieA}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

export default router;