import React, { useState, useEffect } from "react";
import axios from "axios";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  status: string;
  score: string;
}

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("https://api.football-data.org/v2/matches", {
          headers: { "X-Auth-Token": "YOUR_API_KEY" },
        });
        const liveMatches = response.data.matches.map((match: any) => ({
          id: match.id,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          status: match.status,
          score: match.score.fullTime.homeTeam + " - " + match.score.fullTime.awayTeam,
        }));
        setMatches(liveMatches);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jogos ao Vivo</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : matches.length > 0 ? (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={match.id} className="p-4 border rounded bg-white shadow">
              <p className="font-semibold">{match.homeTeam} vs {match.awayTeam}</p>
              <p>Status: {match.status}</p>
              <p>Placar: {match.score}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum jogo ao vivo no momento.</p>
      )}
    </div>
  );
};

export default LiveMatches;
