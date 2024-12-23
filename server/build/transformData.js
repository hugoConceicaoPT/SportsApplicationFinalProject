"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformNextLastLeagueEvent = transformNextLastLeagueEvent;
exports.transformLeagueStandings = transformLeagueStandings;
exports.transformLiveEvents = transformLiveEvents;
function transformNextLastLeagueEvent(element) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1];
    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        strHomeTeam: myElement.strHomeTeam,
        strAwayTeam: myElement.strAwayTeam,
        dateEvent: myElement.dateEvent,
        strTime: myElement.strTime,
        strHomeTeamBadge: myElement.strHomeTeamBadge,
        strAwayTeamBadge: myElement.strAwayTeamBadge,
        idHomeTeam: myElement.idHomeTeam,
        idAwayTeam: myElement.idAwayTeam,
        intHomeScore: myElement.intHomeScore,
        intAwayScore: myElement.intAwayScore
    };
}
function transformLeagueStandings(element) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1];
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
function transformLiveEvents(element) {
    // Interpreta o segundo item do array `element` como `MyType` para acessar as propriedades
    const myElement = element[1];
    // Retorna um novo objeto com transformações específicas nas propriedades do elemento
    return {
        strHomeTeam: myElement.strHomeTeam,
        strAwayTeam: myElement.strAwayTeam,
        strHomeTeamBadge: myElement.strHomeTeamBadge,
        strAwayTeamBadge: myElement.strAwayTeamBadge,
        idHomeTeam: myElement.idHomeTeam,
        idAwayTeam: myElement.idAwayTeam,
        intHomeScore: myElement.intHomeScore,
        intAwayScore: myElement.intAwayScore,
        strProgress: myElement.strProgress
    };
}
