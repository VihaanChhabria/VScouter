import React, { useState } from "react";
import AutoScoringAlgaePlace from "./AutoScoringAlgaePlace";
import { useLocation } from "react-router-dom";
import AutoScoringCoralPickup from "../AutoScoringCoralPickup";

const AutoScoringAlgaeSection = () => {
  const location = useLocation();
  const states = location.state;

  const pickPositions = ["Reef", "Mark 1", "Mark 2", "Mark 3"];

  const [pickReefCount, setPickReefCount] = useState(
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
    { position: "Reef", count: pickReefCount, setCount: setPickReefCount },
    { position: "Mark 1", count: pickMark1Count, setCount: setPickMark1Count },
    { position: "Mark 2", count: pickMark2Count, setCount: setPickMark2Count },
    { position: "Mark 3", count: pickMark3Count, setCount: setPickMark3Count },
  ];

  const [placeNetShot, setPlaceNetShot] = useState(
    states?.inputs?.placeNetShot || 0
  );
  const [placeProcessor, setPlaceProcessor] = useState(
    states?.inputs?.placeProcessor || 0
  );
  const [placeDropMiss, setPlaceDropMiss] = useState(
    states?.inputs?.placeDropMiss || 0
  );

  const placeCounts = [
    { position: "Net Shot", count: placeNetShot, setCount: setPlaceNetShot },
    {
      position: "Processor",
      count: placeProcessor,
      setCount: setPlaceProcessor,
    },
    { position: "Drop/Miss", count: placeDropMiss, setCount: setPlaceDropMiss },
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
      <div style={{ width: "90%", height: "30%" }}>
        <AutoScoringAlgaePlace
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
          placeCounts={placeCounts}
          pickCounts={pickCounts}
        />
      </div>
      <div style={{ width: "90%", height: "15%" }}>
        <AutoScoringCoralPickup
          pickPositions={pickPositions}
          pickPositionSelected={pickPositionSelected}
          setPickPositionSelected={setPickPositionSelected}
        />
      </div>
    </div>
  );
};

export default AutoScoringAlgaeSection;
