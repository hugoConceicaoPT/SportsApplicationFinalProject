import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
import cache from "./cachingRoutes";
import { transformEventLineup, transformEventStatistics } from "./transformData";

router.get("/estatisticas/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookupeventstats.php?id=${req.params.id}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.eventstats).map(transformEventStatistics);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
})

router.get("/formacao/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuplineup.php?id=${req.params.id}`);
        const responseData = await response.json();
        const arr = Object.entries(responseData.lineup).map(transformEventLineup);
        res.json(arr);
    }
    catch(err) {
        next(err);
    }
})



export default router;