import React, { useState } from "react";
import ScoringAlgaePlace from "./ScoringAlgaePlace";
import { useLocation } from "react-router-dom";
import ScoringPickup from "../ScoringPickup";

const ScoringAlgaeSection = ({ pickPositions, pickCounts, placeCounts }) => {
  const [pickPositionSelected, setPickPositionSelected] = useState("");

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
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "7dvh", fontWeight: "bold" }}>
        Algae
      </h1>
      <div style={{ width: "90%", height: "45%", marginBottom: "2dvh" }}>
        <ScoringAlgaePlace
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeCounts={placeCounts}
          pickCounts={pickCounts}
        />
      </div>
      <div style={{ width: "90%", height: "25%", marginBottom: "2dvh" }}>
        <ScoringPickup
          pickPositions={pickPositions}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
        />
      </div>
    </div>
  );
};

export default ScoringAlgaeSection;
