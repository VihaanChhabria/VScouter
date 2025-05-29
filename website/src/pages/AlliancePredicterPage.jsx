import React from "react";
import * as Papa from "papaparse";

const AlliancePredicterPage = () => {
  const EVENT_KEY = "2025njtab";
  const API_KEY = "KwqzvVJmggZH9hIncNA49xoqdPhrhTYvMXpn5LnS6rbNXsCr11kDvvYJHg0z6WoW"

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
      const allianceCaptains = rawAllianceData.map((allianceData) =>{
        return allianceData["picks"][0];
      })

      const rawCSV = await (
        await fetch("VScouterData - Seneca Full.csv")
      ).text();

      const scoutingData = Papa.parse(rawCSV).data;

      const teamDataParsed = {};
      scoutingData.slice(1).forEach((match) => {
        const team = match[3];
        const totalAutoCoralPlace =
          parseInt(match[10]) +
          parseInt(match[11]) +
          parseInt(match[12]) +
          parseInt(match[13]);
        const totalTeleopCoralPlace =
          parseInt(match[29]) +
          parseInt(match[30]) +
          parseInt(match[31]) +
          parseInt(match[32]);
        const totalAutoAlgaePlace =
          (parseInt(match[20]) || 0) + (parseInt(match[21]) || 0);
        const totalTeleopAlgaePlace =
          (parseInt(match[36]) || 0) + (parseInt(match[37]) || 0);

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

      // Step 1: Create average scores and classify roles
      const averageScores = Object.entries(teamDataParsed).map(([team, data]) => {
        const avgAutoCoral = data.totalAutoCoralPlace / data.totalMatches;
        const avgTeleopCoral = data.totalTeleopCoralPlace / data.totalMatches;
        const avgAutoAlgae = data.totalAutoAlgaePlace / data.totalMatches;
        const avgTeleopAlgae = data.totalTeleopAlgaePlace / data.totalMatches;

        const totalCoral = avgAutoCoral + avgTeleopCoral;
        const totalAlgae = avgAutoAlgae + avgTeleopAlgae;

        let role;
        if (totalCoral > totalAlgae + 3) {
          role = "coral";
        } else if (totalAlgae > totalCoral + 3) {
          role = "algae";
        } else {
          role = "hybrid";
        }

        const synergyScore = totalCoral + totalAlgae;

        return {
          team: `frc${team}`,
          avgAutoCoral,
          avgTeleopCoral,
          avgAutoAlgae,
          avgTeleopAlgae,
          totalCoral,
          totalAlgae,
          synergyScore,
          role,
        };
      });

      averageScores.sort((a, b) => b.synergyScore - a.synergyScore);

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
          if (picked.find((teamNumPicked) => teamNumPicked === candidate.team)) return false;
          if (captain.role === "coral")
            return candidate.role === "algae" || candidate.role === "hybrid";
          if (captain.role === "algae")
            return candidate.role === "coral" || candidate.role === "hybrid";
          return true; // hybrid captain picks best available
        });

        if (pick) {
          captain.firstPick = pick.team;
          picked.push(pick.team);
          picked.push(captain.team);
        }
      }

      // Second round
      for (let i = 7; i >= 0; i--) {
        const captain = alliancesSim[i];
        const pick = averageScores.find((candidate) => {
          if (picked.find((teamNumPicked) => teamNumPicked === candidate.team)) return false;
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
      AlliancePredicterPage
      <button onClick={() => click()}>Test</button>
    </div>
  );
};

export default AlliancePredicterPage;
