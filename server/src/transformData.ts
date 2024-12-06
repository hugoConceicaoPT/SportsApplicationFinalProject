interface MyType {
    [key: string]: string;
}

export function transformNextLastLeagueEvent(element: [string, unknown]) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1] as MyType;

    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        strHomeTeam: myElement.strHomeTeam,
        strAwayTeam: myElement.strAwayTeam,
        dateEvent: myElement.dateEvent,
        strTime: myElement.strTime,
        strHomeTeamBadge: myElement.strHomeTeamBadge,
        strAwayTeamBadge: myElement.strAwayTeamBadge,
        intHomeScore: myElement.intHomeScore,
        intAwayScore: myElement.intAwayScore
    };
}