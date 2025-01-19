import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringPage from "../components/ScoringComponents/ScoringPage";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [pickCoralStationCount, setPickCoralStationCount] = useState(
    states?.inputs?.auto?.coral?.pickStationCount || 0
  );
  const [pickCoralMark1Count, setPickCoralMark1Count] = useState(
    states?.inputs?.auto?.coral?.pickMark1Count || 0
  );
  const [pickCoralMark2Count, setPickCoralMark2Count] = useState(
    states?.inputs?.auto?.coral?.pickMark2Count || 0
  );
  const [pickCoralMark3Count, setPickCoralMark3Count] = useState(
    states?.inputs?.auto?.coral?.pickMark3Count || 0
  );

  const pickCoralData = [
    {
      position: "Station",
      count: pickCoralStationCount,
      setCount: setPickCoralStationCount,
    },
    {
      position: "Mark 1",
      count: pickCoralMark1Count,
      setCount: setPickCoralMark1Count,
    },
    {
      position: "Mark 2",
      count: pickCoralMark2Count,
      setCount: setPickCoralMark2Count,
    },
    {
      position: "Mark 3",
      count: pickCoralMark3Count,
      setCount: setPickCoralMark3Count,
    },
  ];

  return (
    <ScoringPage
      pickCoralPositions={["Station", "Mark 1", "Mark 2", "Mark 3"]}
      pickAlgaePositions={["Reef", "Mark 1", "Mark 2", "Mark 3"]}
      statePath={states?.inputs?.auto || null}
      mode="auto"
      nextPage="/teleop-scoring"
      pastPage="/auto-start"
      pickCoralCounts={[
        pickCoralStationCount,
        pickCoralMark1Count,
        pickCoralMark2Count,
        pickCoralMark3Count,
      ]}
      pickCoralData={pickCoralData}
    />
  );
};

export default AutoScoringPage;
