import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformLeagueStandings, transformNextLastLeagueEvent } from "./transformData";

const router: Router = express.Router();

router.get('/serie-a/classificacoes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptable.php?l=${leagueIds.serieA}&s=2024-2025}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.table).map(transformLeagueStandings);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

router.get('/serie-a/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query;
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.serieA}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    }
    catch(err) {
        next(err);
    }
});

router.get('/serie-a/resultados', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query;
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.serieA}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    }
    catch(err) {
        next(err);
    }
});

export default router;