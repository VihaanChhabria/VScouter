import React, { useState } from "react";
import SelectTeamButton from "./SelectTeamButton";

const SelectTeam = ({ coordX = 306, coordY = 10 }) => {
  const [team1Status, setTeam1Status] = useState(false);
  const [team2Status, setTeam2Status] = useState(false);
  const [team3Status, setTeam3Status] = useState(false);
  const [customTeamStatus, setCustomTeamStatus] = useState(false);

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
            setTeam1Status={setTeam1Status}
            setTeam2Status={setTeam2Status}
            setTeam3Status={setTeam3Status}
            setCustomTeamStatus={setCustomTeamStatus}
          />
          <SelectTeamButton
            currentTeamType={"2"}
            currentTeamStatus={team2Status}
            setTeam1Status={setTeam1Status}
            setTeam2Status={setTeam2Status}
            setTeam3Status={setTeam3Status}
            setCustomTeamStatus={setCustomTeamStatus}
          />
          <SelectTeamButton
            currentTeamType={"3"}
            currentTeamStatus={team3Status}
            setTeam1Status={setTeam1Status}
            setTeam2Status={setTeam2Status}
            setTeam3Status={setTeam3Status}
            setCustomTeamStatus={setCustomTeamStatus}
          />
        </div>

        <div style={{ paddingLeft: "16px", display: "flex" }}>
          <h1 style={{ color: "#FFFFFF", fontSize: "20px" }}>Custom (put team # only):</h1>
          <input
            type="text"
            name=""
            id=""
            style={{
              border: "4px solid #1D1E1E",
              borderRadius: "10px",
              backgroundColor: `#${customTeamStatus ? "393939" : "6C6C6C"}`,
              color: "#FFFFFF",
              width: "345px",
              height: "38.18px",
              marginLeft: "4px",
            }}
            onClick={() => {
              setCustomTeamStatus(!customTeamStatus);

              setTeam1Status(false);
              setTeam2Status(false);
              setTeam3Status(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectTeam;
