import React from "react";

import AutoScoringCoralMap from "./AutoScoringCoralMap";
import AutoScoringCoralPickup from "./AutoScoringCoralPickup";

const AutoScoringCoral = () => {
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5dvh",
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "7dvh", fontWeight: "bold" }}>
        Coral
      </h1>
      <div style={{ width: "80%", height: "65%" }}>
        <AutoScoringCoralMap />
      </div>
      <div style={{ width: "90%", height: "15%" }}>
        <AutoScoringCoralPickup />
      </div>
    </div>
  );
};

export default AutoScoringCoral;
