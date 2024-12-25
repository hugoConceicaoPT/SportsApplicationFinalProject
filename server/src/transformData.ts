interface MyType {
    [key: string]: string;
}

export function transformNextLastLeagueEvent(element: [string, unknown]) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1] as MyType;

    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        idEvent: myElement.idEvent,
        strHomeTeam: myElement.strHomeTeam,
        strAwayTeam: myElement.strAwayTeam,
        dateEvent: myElement.dateEvent,
        strTime: myElement.strTime,
        strHomeTeamBadge: myElement.strHomeTeamBadge,
        strAwayTeamBadge: myElement.strAwayTeamBadge,
        idHomeTeam: myElement.idHomeTeam,
        idAwayTeam: myElement.idAwayTeam,
        intRound: myElement.intRound,
        intHomeScore: myElement.intHomeScore,
        intAwayScore: myElement.intAwayScore,
        strStatus: myElement.strStatus,
        strLeague: myElement.strLeague
    };
}

export function transformLeagueStandings(element: [string, unknown]) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1] as MyType;

    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        intRank: myElement.intRank,
        idTeam: myElement.idTeam,
        strTeam: myElement.strTeam,
        strBadge: myElement.strBadge,
        strForm: myElement.strForm,
        intPlayed: myElement.intPlayed,
        intWin: myElement.intWin,
        intLoss: myElement.intLoss,
        intDraw: myElement.intDraw,
        intGoalsFor: myElement.intGoalsFor,
        intGoalsAgainst: myElement.intGoalsAgainst,
        intGoalDifference: myElement.intGoalDifference,
        intPoints: myElement.intPoints
    };
}

export function transformLiveEvents(element: [string, unknown]) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1] as MyType;

    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        idEvent: myElement.idEvent,
        strHomeTeam: myElement.strHomeTeam,
        strAwayTeam: myElement.strAwayTeam,
        strHomeTeamBadge: myElement.strHomeTeamBadge,
        strAwayTeamBadge: myElement.strAwayTeamBadge,
        idHomeTeam: myElement.idHomeTeam,
        idAwayTeam: myElement.idAwayTeam,
        intHomeScore: myElement.intHomeScore,
        intAwayScore: myElement.intAwayScore,
        strProgress: myElement.strProgress,
        strStatus: myElement.strStatus
    };
}

export function transformEventStatistics(element: [string, unknown]) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1] as MyType;

    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        strStat: myElement.strStat,
        intHome: myElement.intHome,
        intAway: myElement.intAway
    }
}