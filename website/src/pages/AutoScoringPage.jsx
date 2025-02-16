import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoringPage from "../components/ScoringComponents/ScoringPage";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [pickPreloadCount, setPickPreloadCount] = useState(
    states?.inputs?.auto?.coral?.preload || 0
  );
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
      position: "Preload",
      count: pickPreloadCount,
      setCount: setPickPreloadCount,
      hide: false,
    },
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

  useEffect(() => {
    const preloadData = pickCoralData.find(
      (singlePickCoralData) => singlePickCoralData.position == "Preload"
    );
    if (preloadData && preloadData.count >= 1) {
      preloadData.hide = true;
    }
  }, [pickCoralData]);

  const [pickAlgaeReefCount, setPickAlgaeReefCount] = useState(
    states?.inputs?.auto?.algae?.pickReefCount || 0
  );
  const [pickAlgaeMark1Count, setPickAlgaeMark1Count] = useState(
    states?.inputs?.auto?.algae?.pickMark1Count || 0
  );
  const [pickAlgaeMark2Count, setPickAlgaeMark2Count] = useState(
    states?.inputs?.auto?.algae?.pickMark2Count || 0
  );
  const [pickAlgaeMark3Count, setPickAlgaeMark3Count] = useState(
    states?.inputs?.auto?.algae?.pickMark3Count || 0
  );

  const pickAlgaeData = [
    {
      position: "Reef",
      count: pickAlgaeReefCount,
      setCount: setPickAlgaeReefCount,
    },
    {
      position: "Mark 1",
      count: pickAlgaeMark1Count,
      setCount: setPickAlgaeMark1Count,
    },
    {
      position: "Mark 2",
      count: pickAlgaeMark2Count,
      setCount: setPickAlgaeMark2Count,
    },
    {
      position: "Mark 3",
      count: pickAlgaeMark3Count,
      setCount: setPickAlgaeMark3Count,
    },
  ];

  return (
    <ScoringPage
      statePath={states?.inputs?.auto || null}
      mode="auto"
      nextPage="/teleop-scoring"
      pastPage="/auto-start"
      pickCoralData={pickCoralData}
      pickAlgaeData={pickAlgaeData}
    />
  );
};

export default AutoScoringPage;
