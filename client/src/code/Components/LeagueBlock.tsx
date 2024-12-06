import React from "react";
import ButtonLeague from "./ButtonLeague";
import { AppProps } from "../main";

const LeagueBlock: React.FC<AppProps> = ({ setState }) => {
    return(
        <div>
             {/* Botão 1 */}
             <ButtonLeague
            setState={setState}
            imageSrc='icons/Inglaterra.png' // Imagem para o botão 1
            label="Premier League"
            />
            {/* Botão 2 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/Portugal.png' // Imagem para o botão 1
            label="Liga Portugal"
            />
            {/* Botão 3 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/Alemanha.png' // Imagem para o botão 1
            label="Bundesliga"
            />
            {/* Botão 4 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/Espanha.png' // Imagem para o botão 1
            label="La Liga"
            />
            {/* Botão 5 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/França.png' // Imagem para o botão 1
            label="Ligue 1"
            />
            {/* Botão 6 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/Italia.png' // Imagem para o botão 1
            label="Serie A"
            />
            {/* Botão 7 */}
            <ButtonLeague
            setState={setState}
            imageSrc='icons/championsLeague.png' // Imagem para o botão 1
            label="Champions League"
            />

        </div>
    )
}
export default LeagueBlock;