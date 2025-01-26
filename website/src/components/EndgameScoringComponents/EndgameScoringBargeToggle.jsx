import React, { useEffect, useState } from "react";

const EndgameScoringBargeToggle = ({ position, climbData }) => {
  const toggleData = climbData.find((singleClimbData) => {
    return singleClimbData.position == position;
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: toggleData.selected ? "#507144" : "#242424",
        borderColor: "#1D1E1E",
        borderRadius: "3.49dvh",
        borderWidth: "1.63dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={() => {
        climbData.map((singleClimbData) =>
          singleClimbData.setSelected(false)
        );
        toggleData.setSelected(!toggleData.selected);
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "6dvh", fontWeight: "bold" }}>
        {position}
      </h1>
    </div>
  );
};

export default EndgameScoringBargeToggle;
