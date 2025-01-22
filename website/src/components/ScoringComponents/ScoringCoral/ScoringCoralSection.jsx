import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringCoralPlaceMap from "./ScoringCoralPlaceMap";
import ScoringPickup from "../ScoringPickup";

const ScoringCoralSection = ({ pickPositions, pickCounts, placeCounts }) => {
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
      <h1 style={{ color: "#FFFFFF", fontSize: "5dvh", fontWeight: "bold", marginBottom: 0}}>
        Coral
      </h1>
      <div style={{ width: "80%", height: "70%", marginBottom: "1.5dvh" }}>
        <ScoringCoralPlaceMap
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeCounts={placeCounts}
          pickCounts={pickCounts}
        />
      </div>
      <div style={{ width: "90%", height: "15%" }}>
        <ScoringPickup
          pickPositions={pickPositions}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
        />
      </div>
    </div>
  );
};

export default ScoringCoralSection;
