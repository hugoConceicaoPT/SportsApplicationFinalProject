import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface INextPastLeagueEvents {
    _id?: number, 
    strHomeTeam: string,
    strAwayTeam: string,
    dateEvent: string,
    strTime: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string
}


// The worker that will perform contact operations.
export class Worker {
    public async listNextLeagueEvents(leagueId:string): Promise<INextPastLeagueEvents[]> {

        
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/`);
        return response.data;
    
      } 
}
