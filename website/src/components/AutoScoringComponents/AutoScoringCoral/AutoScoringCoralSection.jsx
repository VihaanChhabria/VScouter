import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AutoScoringCoralMap from "./AutoScoringCoralPlaceMap";
import AutoScoringPickup from "../AutoScoringPickup";

const AutoScoringCoralSection = () => {
  const location = useLocation();
  const states = location.state;

  const pickPositions = ["Station", "Mark 1", "Mark 2", "Mark 3"];

  const [pickStationCount, setPickStationCount] = useState(
    states?.inputs?.pickStationCount || 0
  );
  const [pickMark1Count, setPickMark1Count] = useState(
    states?.inputs?.pickMark1Count || 0
  );
  const [pickMark2Count, setPickMark2Count] = useState(
    states?.inputs?.pickMark2Count || 0
  );
  const [pickMark3Count, setPickMark3Count] = useState(
    states?.inputs?.pickMark3Count || 0
  );

  const pickCounts = [
    {position: "Station", count: pickStationCount, setCount: setPickStationCount},
    {position: "Mark 1", count: pickMark1Count, setCount: setPickMark1Count},
    {position: "Mark 2", count: pickMark2Count, setCount: setPickMark2Count},
    {position: "Mark 3", count: pickMark3Count, setCount: setPickMark3Count},
  ];

  const [placeL1Count, setPlaceL1Count] = useState(
    states?.inputs?.placeL1Count || 0
  );
  const [placeL2Count, setPlaceL2Count] = useState(
    states?.inputs?.placeL2Count || 0
  );
  const [placeL3Count, setPlaceL3Count] = useState(
    states?.inputs?.placeL3Count || 0
  );
  const [placeL4Count, setPlaceL4Count] = useState(
    states?.inputs?.placeL4Count || 0
  );
  const [placeDropMissCount, setPlaceDropMissCount] = useState(
    states?.inputs?.placeDropMissCount || 0
  );

  const placeCounts = [
    {position: "L1", count: placeL1Count, setCount: setPlaceL1Count},
    {position: "L2", count: placeL2Count, setCount: setPlaceL2Count},
    {position: "L3", count: placeL3Count, setCount: setPlaceL3Count},
    {position: "L4", count: placeL4Count, setCount: setPlaceL4Count},
    {position: "Drop/Miss", count: placeDropMissCount, setCount: setPlaceDropMissCount},
  ];
  

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
        gap: "1.5dvh",
      }}
    >
      <h1 style={{ color: "#FFFFFF", fontSize: "7dvh", fontWeight: "bold" }}>
        Coral
      </h1>
      <div style={{ width: "80%", height: "65%" }}>
        <AutoScoringCoralMap
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeCounts={placeCounts}
          pickCounts={pickCounts}
        />
      </div>
      <div style={{ width: "90%", height: "15%" }}>
        <AutoScoringPickup
          pickPositions={pickPositions}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
        />
      </div>
    </div>
  );
};

export default AutoScoringCoralSection;
