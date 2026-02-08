import React from "react";

/**
 * Renders a component for a team selection button.
 *
 * @param {string} currentTeamType - The type of the current team.
 * @param {boolean} currentTeamStatus - The status of the current team.
 * @param {function} clickTeam - A callback function to handle team selection.
 * @param {string} teamName - The name of the team.
 * @return {JSX.Element} The rendered component.
 */
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
          border: "0.93dvh solid #1D1E1E",
          borderRadius: "2.33dvh",
          backgroundColor: `#${currentTeamStatus ? "393939" : "6C6C6C"}`,
          color: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => clickTeam(currentTeamType, currentTeamStatus)}
      >
        <h1 style={{ fontSize: "4.65dvh", paddingLeft: "2dvh" }}>
          {teamName}
        </h1>
      </div>
    </>
  );
};

export default InitialSelectTeamButton;
