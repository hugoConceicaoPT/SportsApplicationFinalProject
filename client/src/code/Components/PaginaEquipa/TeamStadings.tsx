import React, { useState, useEffect } from "react";

const TeamStandings: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/team/${teamId}/standings`);
        const data = await res.json();
        setStandings(data || []);
      } catch (error) {
        console.error("Failed to fetch team standings", error);
      }
      setLoading(false);
    };

    fetchStandings();
  }, [teamId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Classificações</h2>
      {standings.length ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>P</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team: any, index: number) => (
              <tr key={index}>
                <td>{team.intRank}</td>
                <td>{team.strTeam}</td>
                <td>{team.intPlayed}</td>
                <td>{team.intWin}</td>
                <td>{team.intDraw}</td>
                <td>{team.intLoss}</td>
                <td>{team.intPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Sem informações de classificações disponíveis</p>
      )}
    </div>
  );
};

export default TeamStandings;
