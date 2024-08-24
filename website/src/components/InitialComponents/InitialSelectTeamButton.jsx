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
          border: "0.93vh solid #1D1E1E",
          borderRadius: "2.33vh",
          backgroundColor: `#${currentTeamStatus ? "393939" : "6C6C6C"}`,
          color: "#FFFFFF",
          width: "63.41vw",
          height: "9.53vh",
          marginBottom: "1.63vh",
          marginLeft: "0.64vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => clickTeam(currentTeamType, currentTeamStatus)}
      >
        <h1 style={{ fontSize: "4.65vh", marginLeft: "0.97vw" }}>{teamName}</h1>
      </div>
    </>
  );
};

export default InitialSelectTeamButton;
