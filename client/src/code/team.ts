import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IGameLineup {
    _id?: number,
    strHome: string,
    strSubstitute: string,
    intSquadNumber: string,
    strPlayer: string
}

export interface IGameStatistics {
    _id?: number,
    strStat: string,
    intHome: string,
    intAway: string
}

export interface IGameTimeline {
    _id?: number,
    strTimeline: string,
    strTimelineDetail: string,
    strHome: string,
    strPlayer: string,
    strAssist: string,
    intTime: string
}


// The worker that will perform contact operations.
export class WorkerGame {

    public async getLineup(idEvent : string): Promise<IGameLineup[]> {
        const endpoint = `${config.serverAddress}/jogo/formacao/${idEvent}`;
        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch past league results for ID event: ${idEvent}`, error);
            throw new Error("Unable to retrieve past league results. Please try again later.");
        }
    }

    public async getStatistics(idEvent: string): Promise<IGameStatistics[]> {
        const endpoint = `${config.serverAddress}/jogo/estatisticas/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${idEvent}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league standings for league ID: ${idEvent}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }

    public async getTimeline(idEvent: string): Promise<IGameTimeline[]> {
        const endpoint = `${config.serverAddress}/jogo/timeline/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${idEvent}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league standings for league ID: ${idEvent}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }

}
