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
          method: "GET",
          headers: {
            "X-TBA-Auth-Key": API_KEY,
          },
        }
      );
      
      const teams = await response.json();

      const rawCSV = await (await fetch("../assets/VScouterData - Seneca Full.csv")).text()

      const scoutingData = Papa.parse(rawCSV);

      console.log(scoutingData)
      
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
