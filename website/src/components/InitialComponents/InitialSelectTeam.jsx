import React, { useEffect, useState } from "react";

import SelectTeamButton from "./InitialSelectTeamButton";

/**
 * Renders a component for selecting a team.
 *
 * @param {number} coordX - The X coordinate of the component.
 * @param {number} coordY - The Y coordinate of the component.
 * @param {string} defaultSelectTeam - The default selected team.
 * @param {Function} setSelectTeam - The function to set the selected team.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectTeam = ({ coordX = 32.83, coordY = 2.33, defaultSelectTeam, setSelectTeam }) => {
  // States for the team selection
  const [team1Status, setTeam1Status] = useState(defaultSelectTeam === "0001"); // TODO: make this actually work with json
  const [team2Status, setTeam2Status] = useState(defaultSelectTeam === "0002");
  const [team3Status, setTeam3Status] = useState(defaultSelectTeam === "0003");
  const [customTeamStatus, setCustomTeamStatus] = useState(
    defaultSelectTeam != "0001" && defaultSelectTeam != "0002" && defaultSelectTeam != "0003" && defaultSelectTeam != null
  );

  // State for the custom team value
  const [customTeamValue, setCustomTeamValue] = useState(
    defaultSelectTeam != "0001" && defaultSelectTeam != "0002" && defaultSelectTeam != "0003" && defaultSelectTeam != null
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
      setSelectTeam("0001");
    } else if (team2Status) {
      setSelectTeam("0002");
    } else if (team3Status) {
      setSelectTeam("0003");
    } else if (customTeamStatus && customTeamValue != "") {
      setSelectTeam(customTeamValue);
    } else {
      setSelectTeam(null);
    }
  }, [team1Status, team2Status, team3Status, customTeamStatus, customTeamValue]);

  return (
    <>
      {/* Container */}
      <div
        style={{
          border: "7px solid #1D1E1E",
          width: "66.09vw",
          height: "54.42vh",
          backgroundColor: "#242424",
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
        }}
      >
        <div style={{}}>
          {/* Question */}
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "5.58vh",
              fontWeight: "bold",
              paddingLeft: "1.07vw",
            }}
          >
            Select Team
          </h1>

          {/* Selectors */}
          <SelectTeamButton
            currentTeamType={"1"}
            currentTeamStatus={team1Status}
            clickTeam={clickTeam}
            teamName="0001 - Team 1"
          />
          <SelectTeamButton
            currentTeamType={"2"}
            currentTeamStatus={team2Status}
            clickTeam={clickTeam}
            teamName="0002 - Team 2"
          />
          <SelectTeamButton
            currentTeamType={"3"}
            currentTeamStatus={team3Status}
            clickTeam={clickTeam}
            teamName="0003 - Team 3"
          />
        </div>

        {/* Custom Team Selector */}
        <div style={{ paddingLeft: "1.72vw", display: "flex" }}>
          <h1 style={{ color: "#FFFFFF", fontSize: "4.2vh" }}>Custom (put team # only):</h1>
          <input
            type="text"
            style={{
              border: "0.93vh solid #1D1E1E",
              borderRadius: "2.33vh",
              backgroundColor: `#${customTeamStatus ? "393939" : "6C6C6C"}`,
              color: "#FFFFFF",
              width: "37.02vw",
              height: "8.88vh",
              marginLeft: "0.43vw",
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
