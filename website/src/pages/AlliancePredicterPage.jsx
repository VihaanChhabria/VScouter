import React, { useState } from "react";
import * as Papa from "papaparse";
import kmeans from "skmeans"

const AlliancePredicterPage = () => {
  const EVENT_KEY = "2025njtab";
  const API_KEY =
    "KwqzvVJmggZH9hIncNA49xoqdPhrhTYvMXpn5LnS6rbNXsCr11kDvvYJHg0z6WoW";
  const [predictedAlliances, setPredictedAlliances] = useState(null);
  const [realAlliances, setRealAlliances] = useState(null);

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    color: "black",
  };

  const headerStyleText = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    color: "white",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#298a43",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "20px 0",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "80%",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    backgroundColor: "#343a40",
    color: "white",
  };

  const rowStyle = {
    backgroundColor: "#f8f9fa",
  };

  const click = () => {
    const getTeams = async () => {
      const response = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/alliances`,
        {
          headers: {
            "X-TBA-Auth-Key": API_KEY,
          },
        }
      );

      const rawAllianceData = await response.json();
      setRealAlliances(rawAllianceData);
      const allianceCaptains = rawAllianceData.map((allianceData) => {
        return allianceData["picks"][0];
      });

      const rawCSV = await (
        await fetch("VScouterData - Seneca Full.csv")
      ).text();

      const scoutingData = Papa.parse(rawCSV).data;

      const teamDataParsed = {};
      console.log("Processing team:", scoutingData);
      scoutingData.slice(1).forEach((match) => {
        const team = match[3];
        
        const totalAutoCoralPlace =
          parseInt(match[10]) +
          parseInt(match[11]) +
          parseInt(match[12]) +
          parseInt(match[13]);
        const totalTeleopCoralPlace =
          parseInt(match[28]) +
          parseInt(match[29]) +
          parseInt(match[30]) +
          parseInt(match[31]);
        const totalAutoAlgaePlace =
          (parseInt(match[20]) || 0);
        const totalTeleopAlgaePlace =
          (parseInt(match[35]) || 0);

        if (!teamDataParsed[team]) {
          teamDataParsed[team] = {
            team: team,
            totalMatches: 0,
            totalAutoCoralPlace: 0,
            totalTeleopCoralPlace: 0,
            totalAutoAlgaePlace: 0,
            totalTeleopAlgaePlace: 0,
          };
        }

        teamDataParsed[team].totalMatches++;
        teamDataParsed[team].totalAutoCoralPlace += totalAutoCoralPlace;
        teamDataParsed[team].totalTeleopCoralPlace += totalTeleopCoralPlace;
        teamDataParsed[team].totalAutoAlgaePlace =
          (teamDataParsed[team].totalAutoAlgaePlace || 0) + totalAutoAlgaePlace;
        teamDataParsed[team].totalTeleopAlgaePlace =
          (teamDataParsed[team].totalTeleopAlgaePlace || 0) +
          totalTeleopAlgaePlace;
      });

      const averageScores = Object.values(teamDataParsed).map((team) => {
        const avgAutoCoral = team.totalAutoCoralPlace / team.totalMatches;
        const avgTeleopCoral = team.totalTeleopCoralPlace / team.totalMatches;
        const avgAutoAlgae = team.totalAutoAlgaePlace / team.totalMatches;
        const avgTeleopAlgae = team.totalTeleopAlgaePlace / team.totalMatches;
      
        return {
          team: team.team,
          avgAutoCoral,
          avgTeleopCoral,
          avgAutoAlgae,
          avgTeleopAlgae,
          totalCoral: avgAutoCoral + avgTeleopCoral,
          totalAlgae: avgAutoAlgae + avgTeleopAlgae,
        };
      });
      
      

      // Extract only numerical features for clustering
      const vectors = averageScores.map((team) => [
        team.avgAutoCoral,
        team.avgTeleopCoral,
        team.avgAutoAlgae,
        team.avgTeleopAlgae,
      ]);

      // Perform K-Means clustering
      const kmeansResult = kmeans(vectors, 3);
      console.log(kmeansResult);

      // {
      //   "it": 6,
      //   "k": 3,
      //   "idxs": [
      //     2,
      //     0,
      //     2,
      //     0,
      //     1,
      //     1,
      //     1,
      //     2,
      //     2,
      //     1,
      //     2,
      //     2,
      //     0,
      //     1,
      //     2,
      //     0,
      //     1,
      //     2,
      //     2,
      //     0,
      //     1,
      //     1,
      //     2,
      //     0,
      //     2,
      //     0,
      //     2,
      //     0,
      //     0,
      //     2,
      //     0,
      //     0,
      //     0,
      //     2,
      //     2,
      //     2
      //   ],
      //   "centroids": [
      //     [
      //       0.10300925925925926,
      //       0.43042328042328043,
      //       0,
      //       0.08101851851851852
      //     ],
      //     [
      //       0.6579861111111112,
      //       6.819444444444444,
      //       0,
      //       0.015625
      //     ],
      //     [
      //       0.39821428571428563,
      //       3.2598214285714286,
      //       0,
      //       0.017857142857142856
      //     ]
      //   ]
      // }
      // Group by cluster to compute average coral/algae
      const clusterAverages = {};
      kmeansResult.clusters.forEach((clusterID, index) => {
        const team = averageScores[index];
        if (!clusterAverages[clusterID]) {
          clusterAverages[clusterID] = {
            totalCoral: 0,
            totalAlgae: 0,
            count: 0,
          };
        }
        clusterAverages[clusterID].totalCoral += team.totalCoral;
        clusterAverages[clusterID].totalAlgae += team.totalAlgae;
        clusterAverages[clusterID].count += 1;
      });

      // Determine role for each cluster
      const clusterToRole = {};
      Object.entries(clusterAverages).forEach(([clusterID, data]) => {
        const avgCoral = data.totalCoral / data.count;
        const avgAlgae = data.totalAlgae / data.count;
        if (Math.abs(avgCoral - avgAlgae) < 2) {
          clusterToRole[clusterID] = "hybrid";
        } else if (avgCoral > avgAlgae) {
          clusterToRole[clusterID] = "coral";
        } else {
          clusterToRole[clusterID] = "algae";
        }
      });

      // Add role to averageScores
      averageScores.forEach((team, i) => {
        const cluster = kmeansResult.clusters[i];
        team.role = clusterToRole[cluster];
      });

      const captainsData = allianceCaptains.map((teamNum) => ({
        team: teamNum,
        role: averageScores.find((team) => {
          return team.team === teamNum;
        }).role,
      }));
      const picked = [];

      const alliancesSim = captainsData.map((captain) => ({
        captain: captain.team,
        role: captain.role,
        firstPick: null,
        secondPick: null,
      }));

      // First round
      for (let i = 0; i < 8; i++) {
        const captain = alliancesSim[i];
        const pick = averageScores.find((candidate) => {
          picked.push(captain.team);
          if (picked.find((teamNumPicked) => teamNumPicked === candidate.team))
            return false;
          if (captain.role === "coral")
            return candidate.role === "algae" || candidate.role === "hybrid";
          if (captain.role === "algae")
            return candidate.role === "coral" || candidate.role === "hybrid";
          return true; // hybrid captain picks best available
        });

        if (pick) {
          captain.firstPick = pick.team;
          picked.push(pick.team);
          picked.push(captain.captain);
        }
      }

      // Second round
      for (let i = 7; i >= 0; i--) {
        const captain = alliancesSim[i];
        const pick = averageScores.find((candidate) => {
          if (picked.find((teamNumPicked) => teamNumPicked === candidate.team))
            return false;
          if (captain.role === "coral")
            return candidate.role === "algae" || candidate.role === "hybrid";
          if (captain.role === "algae")
            return candidate.role === "coral" || candidate.role === "hybrid";
          return true;
        });

        if (pick) {
          captain.secondPick = pick.team;
          picked.push(pick.team);
        }
      }

      console.log("Predicted Alliances:");
      console.log(alliancesSim);
      setPredictedAlliances(alliancesSim);
    };

    getTeams();
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          AlliancePredicterPage
          <button onClick={() => click()} style={buttonStyle}>
            Generate Predicted Alliances
          </button>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
          }}
        >
          {predictedAlliances && (
            <div>
              <h2 style={{ color: "#343a40" }}>Predicted Alliances</h2>
              <table style={tableStyle}>
                <thead>
                  <tr style={headerStyle}>
                    <th style={headerStyleText}>#</th>
                    <th style={headerStyleText}>Captain</th>
                    <th style={headerStyleText}>1st Pick</th>
                    <th style={headerStyleText}>2nd Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {predictedAlliances.map((alliance, index) => (
                    <tr key={index} style={rowStyle}>
                      <td style={cellStyle}>{index + 1}</td>
                      <td style={cellStyle}>{alliance.captain}</td>
                      <td style={cellStyle}>{alliance.firstPick || "TBD"}</td>
                      <td style={cellStyle}>{alliance.secondPick || "TBD"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlliancePredicterPage;
