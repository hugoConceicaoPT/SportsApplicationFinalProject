import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformNextLastLeagueEvent } from "./transformData";

const router: Router = express.Router();

router.get('/liga-dos-campeoes/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.championsLeague}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

router.get('/liga-dos-campeoes/resultados', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.championsLeague}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
});

export default router;