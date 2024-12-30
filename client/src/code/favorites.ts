import axios, { AxiosResponse } from "axios";
import { config } from "./config";

export interface IFavorites {
    _id?: number,
    leagueIds: string[],
    leagueName: string[],
    leagueBadge: string[],
    teamIds: string[],
    teamName: string[],
    teamBadge: string[]
}

export class WorkerFavorites {
    public async getFavorites(): Promise<IFavorites> {
        try{
            const response : AxiosResponse = await axios.get(`${config.serverAddress}/favorites`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            throw new Error("Unable to favorites. Please try again later.");
        }
    }   

    public async toggleFavorite(id: string, name: string, badge: string): Promise<AxiosResponse> {
        try{
            const response : AxiosResponse = await axios.post(`${config.serverAddress}/favorites`, {
                id: id,
                badge: badge,
                name: name,
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            throw new Error("Unable to add or remove favorite. Please try again later.");
        }
    }
}

export default WorkerFavorites;