import React, { useEffect, useState } from "react";

import SelectTeamButton from "./GameStartSelectTeamButton";

/**
 * Renders a component for selecting a team.
 *
 * @param {number} coordX - The X coordinate of the component.
 * @param {number} coordY - The Y coordinate of the component.
 * @param {string} defaultSelectTeam - The default selected team.
 * @param {Function} setSelectTeam - The function to set the selected team.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectTeam = ({
  coordX = 32.83,
  coordY = 2.33,
  defaultSelectTeam,
  setSelectTeam,
  selectedMatch,
  selectedAlliance,
}) => {
  let baseTeams = [];
  try {
    baseTeams =
      selectedMatch > JSON.parse(localStorage.getItem("matchData")).length ||
      selectedMatch < 1
        ? JSON.parse(localStorage.getItem("matchData"))[0]
        : JSON.parse(localStorage.getItem("matchData"))[selectedMatch - 1 || 0];
    baseTeams = baseTeams[selectedAlliance ? selectedAlliance : "redAlliance"];
  } catch {
    baseTeams = ["0001", "0002", "0003"];
  }

  // States for the team selection
  const [team1Status, setTeam1Status] = useState(
    defaultSelectTeam === baseTeams[0]
  );
  const [team2Status, setTeam2Status] = useState(
    defaultSelectTeam === baseTeams[1]
  );
  const [team3Status, setTeam3Status] = useState(
    defaultSelectTeam === baseTeams[2]
  );
  const [customTeamStatus, setCustomTeamStatus] = useState(
    defaultSelectTeam != baseTeams[0] &&
      defaultSelectTeam != baseTeams[1] &&
      defaultSelectTeam != baseTeams[2] &&
      defaultSelectTeam != null
  );

  // State for the custom team value
  const [customTeamValue, setCustomTeamValue] = useState(
    defaultSelectTeam != baseTeams[0] &&
      defaultSelectTeam != baseTeams[1] &&
      defaultSelectTeam != baseTeams[2] &&
      defaultSelectTeam != null
      ? defaultSelectTeam
      : ""
  );

  // Function to handle team selection
  const clickTeam = (currentTeamType, currentTeamStatus) => {
    if (currentTeamType === "1") {
      setTeam1Status(!currentTeamStatus);

      setTeam2Status(false);
      setTeam3Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "2") {
      setTeam2Status(!currentTeamStatus);

      setTeam1Status(false);
      setTeam3Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "3") {
      setTeam3Status(!currentTeamStatus);

      setTeam1Status(false);
      setTeam2Status(false);
      setCustomTeamStatus(false);
    } else if (currentTeamType === "custom") {
      setCustomTeamStatus(!customTeamStatus);

      setTeam1Status(false);
      setTeam2Status(false);
      setTeam3Status(false);
    }
  };

  // Effect to set the selected team
  useEffect(() => {
    if (team1Status) {
      setSelectTeam(baseTeams[0]);
    } else if (team2Status) {
      setSelectTeam(baseTeams[1]);
    } else if (team3Status) {
      setSelectTeam(baseTeams[2]);
    } else if (customTeamStatus && customTeamValue != "") {
      setSelectTeam(customTeamValue);
    } else {
      setSelectTeam(null);
    }
  }, [
    team1Status,
    team2Status,
    team3Status,
    customTeamStatus,
    customTeamValue,
  ]);

  return (
    <>
      {/* Container */}
      <div
        style={{
          border: "1.3dvh solid #1D1E1E",
          width: "66.09dvw",
          height: "54.42dvh",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          position: "absolute",
          left: `${coordX}dvw`,
          top: `${coordY}dvh`,
        }}
      >
        <div style={{}}>
          {/* Question */}
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58dvh",
              fontWeight: "bold",
              paddingLeft: "1.07dvw",
            }}
          >
            Select Team
          </h1>

          {/* Selectors */}
          <SelectTeamButton
            currentTeamType={"1"}
            currentTeamStatus={team1Status}
            clickTeam={clickTeam}
            teamName={baseTeams[0]}
          />
          <SelectTeamButton
            currentTeamType={"2"}
            currentTeamStatus={team2Status}
            clickTeam={clickTeam}
            teamName={baseTeams[1]}
          />
          <SelectTeamButton
            currentTeamType={"3"}
            currentTeamStatus={team3Status}
            clickTeam={clickTeam}
            teamName={baseTeams[2]}
          />
        </div>

        {/* Custom Team Selector */}
        <div style={{ paddingLeft: "1.72dvw", display: "flex" }}>
          <h1 style={{ color: "#FFFFFF", fontSize: "4.2dvh" }}>
            Custom (put team # only):
          </h1>
          <input
            type="text"
            style={{
              border: "0.93dvh solid #1D1E1E",
              borderRadius: "2.33dvh",
              backgroundColor: `#${customTeamStatus ? "393939" : "6C6C6C"}`,
              color: "#FFFFFF",
              width: "37.02dvw",
              height: "8.88dvh",
              marginLeft: "0.43dvw",
              fontSize: "4.0dvh",
            }}
            onClick={() => clickTeam("custom", customTeamStatus)}
            value={customTeamValue}
            onChange={(e) => setCustomTeamValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default InitialSelectTeam;
