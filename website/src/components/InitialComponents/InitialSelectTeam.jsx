import React, { useEffect, useState } from "react";
import SelectTeamButton from "./InitialSelectTeamButton";

const InitialSelectTeam = ({ coordX = 306, coordY = 10, defaultSelectTeam, setSelectTeam }) => {
  const [team1Status, setTeam1Status] = useState(defaultSelectTeam === "0001"); // TODO: make this actually work with json
  const [team2Status, setTeam2Status] = useState(defaultSelectTeam === "0002");
  const [team3Status, setTeam3Status] = useState(defaultSelectTeam === "0003");
  const [customTeamStatus, setCustomTeamStatus] = useState(
    defaultSelectTeam != "0001" && defaultSelectTeam != "0002" && defaultSelectTeam != "0003" && defaultSelectTeam != null
  );

  const [customTeamValue, setCustomTeamValue] = useState(
    defaultSelectTeam != "0001" && defaultSelectTeam != "0002" && defaultSelectTeam != "0003" && defaultSelectTeam != null
      ? defaultSelectTeam
      : ""
  );

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
      <div
        style={{
          border: "7px solid #1D1E1E",
          width: "616px",
          height: "234px",
          backgroundColor: "#242424",
          borderRadius: "15px",
          position: "absolute",
          left: `${coordX}px`,
          top: `${coordY}px`,
        }}
      >
        <div style={{}}>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "24px",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            Select Team
          </h1>

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

        <div style={{ paddingLeft: "16px", display: "flex" }}>
          <h1 style={{ color: "#FFFFFF", fontSize: "20px" }}>Custom (put team # only):</h1>
          <input
            type="text"
            style={{
              border: "4px solid #1D1E1E",
              borderRadius: "10px",
              backgroundColor: `#${customTeamStatus ? "393939" : "6C6C6C"}`,
              color: "#FFFFFF",
              width: "345px",
              height: "38.18px",
              marginLeft: "4px",
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
