import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
import cache from "./cachingRoutes";
import { transformEventStatistics } from "./transformData";

router.get("/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
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


export default router;