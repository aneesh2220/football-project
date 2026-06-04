import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 fetch("https://football-project-backend.onrender.com/standings")
    .then((res) => res.json())
    .then((data) => setTeams(data));
}, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
     <div className="main_heading">
      <h1 className="main-title">Premier League Standings</h1>
      </div> 

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>
          {table.map((team) => (
            <tr key={team.team.id}>
              <td>{team.position}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={team.team.crest} alt={team.team.name} width="25" />
                  {team.team.name}
                </div>
              </td>

              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
