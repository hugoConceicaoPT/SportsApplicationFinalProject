import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Interfaces para descrever as informações de jogo
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

// Worker responsável por operações relacionadas aos jogos
export class WorkerGame {

    // Obtém a formação de um jogo pelo ID do evento
    public async getLineup(idEvent: string): Promise<IGameLineup[]> {
        const endpoint = `${config.serverAddress}/jogo/formacao/${idEvent}`;
        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch lineup for ID event: ${idEvent}`, error);
            throw new Error("Unable to retrieve lineup. Please try again later.");
        }
    }

    // Obtém as estatísticas de um jogo pelo ID do evento
    public async getStatistics(idEvent: string): Promise<IGameStatistics[]> {
        const endpoint = `${config.serverAddress}/jogo/estatisticas/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for ID event: ${idEvent}`);
        }

        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch statistics for ID event: ${idEvent}`, error);
            throw new Error("Unable to retrieve statistics. Please try again later.");
        }
    }

    // Obtém a timeline de um jogo pelo ID do evento
    public async getTimeline(idEvent: string): Promise<IGameTimeline[]> {
        const endpoint = `${config.serverAddress}/jogo/timeline/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for ID event: ${idEvent}`);
        }

        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch timeline for ID event: ${idEvent}`, error);
            throw new Error("Unable to retrieve timeline. Please try again later.");
        }
    }

}
