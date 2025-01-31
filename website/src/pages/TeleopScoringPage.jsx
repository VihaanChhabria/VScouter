import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringPage from "../components/ScoringComponents/ScoringPage";

const TeleopScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [pickCoralStationCount, setPickCoralStationCount] = useState(
    states?.inputs?.teleop?.coral?.pickStationCount || 0
  );
  const [pickCoralCarpetCount, setPickCoralCarpetCount] = useState(
    states?.inputs?.teleop?.coral?.pickCarpetCount || 0
  );

  const pickCoralData = [
    {
      position: "Station",
      count: pickCoralStationCount,
      setCount: setPickCoralStationCount,
    },
    {
      position: "Carpet",
      count: pickCoralCarpetCount,
      setCount: setPickCoralCarpetCount,
    },
  ];

  const [pickAlgaeReefCount, setPickAlgaeReefCount] = useState(
    states?.inputs?.teleop?.algae?.pickReefCount || 0
  );
  const [pickAlgaeCarpetCount, setPickAlgaeCarpetCount] = useState(
    states?.inputs?.teleop?.algae?.pickCarpetCount || 0
  );

  const pickAlgaeData = [
    {
      position: "Reef",
      count: pickAlgaeReefCount,
      setCount: setPickAlgaeReefCount,
    },
    {
      position: "Carpet",
      count: pickAlgaeCarpetCount,
      setCount: setPickAlgaeCarpetCount,
    },
  ];

  return (
    <ScoringPage
      pickCoralPositions={["Station", "Carpet"]}
      pickAlgaePositions={["Reef", "Carpet"]}
      statePath={states?.inputs?.teleop || null}
      mode="teleop"
      nextPage="/endgame-scoring"
      pastPage="/auto-scoring"
      pickCoralCounts={[pickCoralStationCount, pickCoralCarpetCount]}
      pickCoralData={pickCoralData}
      pickAlgaeCounts={[pickAlgaeReefCount, pickAlgaeCarpetCount]}
      pickAlgaeData={pickAlgaeData}
    />
  );
};

export default TeleopScoringPage;
