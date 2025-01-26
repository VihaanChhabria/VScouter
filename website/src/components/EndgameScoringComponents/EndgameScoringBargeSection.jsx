import React from "react";
import EndgameScoringBargeToggle from "./EndgameScoringBargeToggle";

const EndgameScoringBargeSection = ({ climbData }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#3B3B3B",
        borderColor: "#1D1E1E",
        borderWidth: "2dvh",
        borderRadius: "3.49dvh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "3dvh 2dvw",
        gap: "1dvw", //edit this
      }}
    >
      {climbData.map((singleClimbData) => (
        <div id={climbData.position} style={{ height: "100%", flex: "1" }}>
          <EndgameScoringBargeToggle
            position={singleClimbData.position}
            climbData={climbData}
          />
        </div>
      ))}
    </div>
  );
};

export default EndgameScoringBargeSection;
