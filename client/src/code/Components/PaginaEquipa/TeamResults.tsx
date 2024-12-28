import React, { useState, useEffect } from "react";
import { config } from "../../config";

const TeamResults: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.serverAddress}/equipa/${teamId}/resultados`);
        const data = await res.json();
        setResults(data || []);
      } catch (error) {
        console.error("Failed to fetch team results", error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [teamId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Resultados</h2>
      {results.length ? (
        <ul>
          {results.map((result: any, index: number) => (
            <li key={index}>
              {result.strHomeTeam} {result.intHomeScore} -{" "}
              {result.intAwayScore} {result.strAwayTeam}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado encontrado</p>
      )}
    </div>
  );
};

export default TeamResults;
