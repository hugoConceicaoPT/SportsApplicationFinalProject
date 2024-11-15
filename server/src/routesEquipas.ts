import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

router.get("/:id/lista", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
})

router.get("/:id/resultados", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
})

export default router;