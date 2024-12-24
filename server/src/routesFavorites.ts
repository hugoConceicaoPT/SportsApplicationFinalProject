import express, { Request, Response, NextFunction, Router } from "express";
const Favorites = require("./models/favorites");

const router: Router = express.Router();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para adicionar aos Favoritos");
        }
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

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para aceder aos favoritos");
        }
        const { username } = req.params;
        let favorites = await Favorites.findOne({ username });

        if(!favorites) res.send("not found");

        const leagueIds = await favorites?.leagueIds;
        const teamIds = await favorites?.teamIds;
        res.json({leagueIds, teamIds});
    }
    catch(err) {
        next(err);
    }
});


router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.isAuthenticated()) {
            res.send("Necessita de estar logado para apagar dos Favoritos");
        }
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