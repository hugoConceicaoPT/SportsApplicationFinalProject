import React, { useState, useEffect } from "react";

const TeamList: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/team/${teamId}/lista`);
        const data = await res.json();
        setList(data || []);
      } catch (error) {
        console.error("Failed to fetch team list", error);
      }
      setLoading(false);
    };

    fetchList();
  }, [teamId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Próximos Jogos</h2>
      {list.length ? (
        <ul>
          {list.map((game: any, index: number) => (
            <li key={index}>
              {game.dateEvent} - {game.strHomeTeam} vs {game.strAwayTeam}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum jogo na lista</p>
      )}
    </div>
  );
};

export default TeamList;
