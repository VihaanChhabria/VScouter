import React from "react";
import * as Papa from 'papaparse';

const AlliancePredicterPage = () => {
  const EVENT_KEY = "2016nytr";
  const API_KEY = "KwqzvVJmggZH9hIncNA49xoqdPhrhTYvMXpn5LnS6rbNXsCr11kDvvYJHg0z6WoW"

  const click = () => {
    const getTeams = async () => {
      const response = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/keys`,
        {
          headers: {
            "X-TBA-Auth-Key": API_KEY,
          },
        }
      );
      
      const teams = await response.json();
      console.log(teams);

      const rawCSV = await (await fetch("/VScouterData - Seneca Full.csv")).text()

      const scoutingData = Papa.parse(rawCSV).data;

      console.log(scoutingData)

      const teamAverages = {};
      scoutingData.slice(1).forEach((match) => {
        const team = match[3];
        const totalAutoCoralPlace = parseInt(match[10]) + parseInt(match[11]) + parseInt(match[12]) + parseInt(match[13]);
        const totalTeleopCoralPlace = parseInt(match[29]) + parseInt(match[30]) + parseInt(match[31]) + parseInt(match[32]);
        // const totalClimbAttempts = (match[42] === "true" ? 1 : 0) + (match[43] === "true" ? 1 : 0) + (match[44] === "true" ? 1 : 0);
        // const totalParkAttempts = match[45] === "true" ? 1 : 0;

        if (!teamAverages[team]) {
          teamAverages[team] = {
            totalMatches: 0,
            totalAutoCoralPlace: 0,
            totalTeleopCoralPlace: 0,
            // totalClimbAttempts: 0,
            // totalParkAttempts: 0,
          };
        }

        teamAverages[team].totalMatches++;
        teamAverages[team].totalAutoCoralPlace += totalAutoCoralPlace;
        teamAverages[team].totalTeleopCoralPlace += totalTeleopCoralPlace;
        teamAverages[team].totalClimbAttempts += totalClimbAttempts;
        teamAverages[team].totalParkAttempts += totalParkAttempts;
      });

      console.log(teamAverages);
      
    };

    getTeams();
  }
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
