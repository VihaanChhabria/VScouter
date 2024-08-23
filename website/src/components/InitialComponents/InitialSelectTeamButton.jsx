import React from "react";

const InitialSelectTeamButton = ({
  currentTeamType,
  currentTeamStatus,
  clickTeam,
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
        onClick={() => clickTeam(currentTeamType, currentTeamStatus)}
      >
        <h1 style={{ fontSize: "20px", marginLeft: "9px" }}>{teamName}</h1>
      </div>
    </>
  );
};

export default InitialSelectTeamButton;
