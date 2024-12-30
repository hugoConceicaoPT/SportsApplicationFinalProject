import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";
import { INextPastLeagueEvents } from "./league";


export interface ITeamDetails {
    idLeague: string,
    strLeague: string
}


// The worker that will perform contact operations.
export class WorkerTeam {

    public async getNextTeamList(teamId: string): Promise<INextPastLeagueEvents[]> {

        let endpoint = `${config.serverAddress}/equipa/${teamId}`;
        endpoint += "/lista";
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${teamId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league events for league ID: ${teamId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

    public async getTeamDetails(teamId: string): Promise<ITeamDetails[]> {

        let endpoint = `${config.serverAddress}/equipa/${teamId}/detalhes`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${teamId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league events for league ID: ${teamId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

}
