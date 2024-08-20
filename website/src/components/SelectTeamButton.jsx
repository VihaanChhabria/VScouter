import React from "react";

const SelectTeamButton = ({
  currentTeamType,
  currentTeamStatus,
  setTeam1Status,
  setTeam2Status,
  setTeam3Status,
  setCustomTeamStatus,
  teamName = "0000 - Team Name",
}) => {
  return (
    <>
      <div
        style={{
          border: "4px solid #1D1E1E",
          borderRadius: "10px",
          backgroundColor: `#${currentTeamStatus ? "393939" : "6C6C6C"}`,
          color: "#FFFFFF",
          width: "591px",
          height: "41px",
          marginBottom: "7px",
          marginLeft: "6px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => {
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
          }
        }}
      >
        <h1 style={{ fontSize: "20px", marginLeft: "9px" }}>{teamName}</h1>
      </div>
    </>
  );
};

export default SelectTeamButton;
