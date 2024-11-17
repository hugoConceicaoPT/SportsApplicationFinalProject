import express, { Request, Response, NextFunction, Router } from "express";
import favorites from "./models/favorites";
import Favorites from "./models/favorites";


const router: Router = express.Router();

router.post('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.params;
        const {leagueID} = req.body;
        let favorites = await Favorites.findOne({email});

        if(!favorites){
            favorites = new Favorites({
                email,
                leagueIds : [leagueID]
            });
            await favorites.save();
            res.send("ok");
        }
        else{
            if(!favorites.leagueIds.includes(leagueID)){
                favorites.leagueIds.push(leagueID);
                await favorites.save();
                res.send("ok");   
            }
            res.send("league already in favorites");
        }    
    }
    catch(err) {
        next(err);
    }
})


router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.params;
        let favorites = await Favorites.findOne({email});

        if(!favorites) res.send("not found");

        const leagueIds = await favorites?.leagueIds;
        res.json(leagueIds);
    }
    catch(err) {
        next(err);
    }
})


router.delete('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.params;
        const {leagueID} = req.body;
        let favorites = await Favorites.findOne({email});

        if(!favorites){
            res.send("not found");
        }
        else{
            const result = await Favorites.findOneAndUpdate(
                { email }, 
                { $pull: { leagueIds: leagueID } }, 
                { new: true }
            );
            res.send("ok")
        }   
    }
    catch(err) {
        next(err);
    }
})

export default router;