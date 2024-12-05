"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformNextLastLeagueEvent = transformNextLastLeagueEvent;
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
    };
}
