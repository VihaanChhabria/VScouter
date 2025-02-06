import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MatchDataOnlinePage = () => {
  const navigate = useNavigate()
  const [eventKey, setEventKey] = useState("");

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          border: "1.63dvh solid #1D1E1E",
          width: "14.91dvw",
          height: "17.84dvh",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "1.07dvh",
          left: "2.33dvw",
        }}
        onClick={() => {
          navigate("/match-data");
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
          }}
        >
          Back
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5%",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "7dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Please Enter Your Competition's Event Code (ex: 2024mrcmp)
        </h1>
        <input
          type="text"
          onChange={(e) => setEventKey(e.target.value)}
          style={{
            border: "0.93dvh solid #1D1E1E",
            borderRadius: "2.33dvh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            width: "40%",
            height: "8.88dvh",
            fontSize: "4.0dvh",
          }}
        />

        <div
          style={{
            border: "1.63dvh solid #1D1E1E",
            width: "20%",
            height: "20%",
            backgroundColor: "#242424",
            borderRadius: "3.49dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            const getMatches = async () => {
              const response = await fetch(
                `https://api.statbotics.io/v3/matches?event=${eventKey}`
              );
              const allMatches = await response.json();

              const cleanedMatches = [];
              for (let match of allMatches) {
                if (match.comp_level == "qm") {
                  cleanedMatches.push({
                    matchNum: match.match_number,
                    redAlliance: match.alliances.red.team_keys.map((team) =>
                      team.toString()
                    ),
                    blueAlliance: match.alliances.blue.team_keys.map((team) =>
                      team.toString()
                    ),
                  });
                }
              }
              localStorage.setItem("matchData", JSON.stringify(cleanedMatches));
              toast.success(
                "Match Data Fetched: " +
                  JSON.parse(localStorage.getItem("matchData"))[0]
                    .redAlliance[0]
              ); // Notifying the user that the data has been fetched
            };
            getMatches();
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
            }}
          >
            Done
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MatchDataOnlinePage;
