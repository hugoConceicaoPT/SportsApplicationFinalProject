import express, { Request, Response, NextFunction, Router } from "express";
const Favorites = require("./models/favorites");


const router: Router = express.Router();

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user_id)
        return res.redirect('http://localhost:8080');
    next();
}

router.post('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.params;
        const {id} = req.body;
        const idString = id.tostring();
       
        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;

        let favorites = await Favorites.findOne({email});

        if(!favorites){
            favorites = new Favorites({
                email,
                leagueIds: isLeague ? [idString] : [],
                teamIds: isTeam ? [idString] : [],
            });
            await favorites.save();
            res.send("ok");
        }
        else{
            if (isLeague) {
                if (!favorites.leagueIds.includes(idString)) {
                    favorites.leagueIds.push(idString);
                }
            }
            if (isTeam) {
                if (!favorites.teamIds.includes(idString)) {
                    favorites.teamIds.push(idString);
                }
            }
            await favorites.save();
            res.send("ok");
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
        const teamIds = await favorites?.teamIds;
        res.json({leagueIds, teamIds});
    }
    catch(err) {
        next(err);
    }
})

router.get('/', requireLogin ,async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.params;
        let favorites = await Favorites.findOne({email});

        if(!favorites) res.send("not found");

        const leagueIds = await favorites?.leagueIds;
        const teamIds = await favorites?.teamIds;
        res.send("ok");
        res.json({leagueIds, teamIds});
    }
    catch(err) {
        next(err);
    }
});


router.delete('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.params;
        const {id} = req.body;
        const idString = id.tostring();

        const isLeague = idString.length === 4;
        const isTeam = idString.length === 7;

        
        let favorites = await Favorites.findOne({email});

        if(!favorites){
            res.send("not found");
        }
        else{
            if(isLeague){
                const result = await Favorites.findOneAndUpdate(
                    { email }, 
                    { $pull: { leagueIds: id } },
                    { new: true }
                );
                res.send("ok")
            }
            if(isTeam){
                const result = await Favorites.findOneAndUpdate(
                    { email }, 
                    { $pull: { leagueIds: id } },
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