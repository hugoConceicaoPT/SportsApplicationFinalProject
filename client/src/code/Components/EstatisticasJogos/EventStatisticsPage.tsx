// Importa o módulo React, necessário para criar componentes no React.
import React, { useState } from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../../main";
import Header from "../PaginaPrincipal/Header";
import { ILiveEvents, INextLeagueEvents } from "../../league";

interface EventStatisticsPageProps extends AppProps {
    event: INextLeagueEvents | ILiveEvents
}

const EventStatisticsPage: React.FC<EventStatisticsPageProps> = ({ setState, event }) => {
    return (
        <div>
            <Header setState={setState} />
        </div>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default EventStatisticsPage;