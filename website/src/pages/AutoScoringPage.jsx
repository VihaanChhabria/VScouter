import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScoringCoralSection from "../components/ScoringComponents/ScoringCoral/ScoringCoralSection";
import ScoringAlgaeSection from "../components/ScoringComponents/ScoringAlgae/ScoringAlgaeSection";
import ProceedBackButton from "../components/ProceedBackButton";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  // State stack for undo functionality
  const [stateStack, setStateStack] = useState([]);

  // Coral States
  const pickCoralPositions = ["Station", "Mark 1", "Mark 2", "Mark 3"];

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

  const pickCoralCounts = [
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

  const [placeCoralL1Count, setPlaceCoralL1Count] = useState(
    states?.inputs?.auto?.coral?.placeL1Count || 0
  );
  const [placeCoralL2Count, setPlaceCoralL2Count] = useState(
    states?.inputs?.auto?.coral?.placeL2Count || 0
  );
  const [placeCoralL3Count, setPlaceCoralL3Count] = useState(
    states?.inputs?.auto?.coral?.placeL3Count || 0
  );
  const [placeCoralL4Count, setPlaceCoralL4Count] = useState(
    states?.inputs?.auto?.coral?.placeL4Count || 0
  );
  const [placeCoralDropMissCount, setPlaceCoralDropMissCount] = useState(
    states?.inputs?.auto?.coral?.placeDropMissCount || 0
  );

  const placeCoralCounts = [
    {
      position: "L1",
      count: placeCoralL1Count,
      setCount: setPlaceCoralL1Count,
    },
    {
      position: "L2",
      count: placeCoralL2Count,
      setCount: setPlaceCoralL2Count,
    },
    {
      position: "L3",
      count: placeCoralL3Count,
      setCount: setPlaceCoralL3Count,
    },
    {
      position: "L4",
      count: placeCoralL4Count,
      setCount: setPlaceCoralL4Count,
    },
    {
      position: "Drop/Miss",
      count: placeCoralDropMissCount,
      setCount: setPlaceCoralDropMissCount,
    },
  ];

  // Algae States
  const pickAlgaePositions = ["Reef", "Mark 1", "Mark 2", "Mark 3"];

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

  const pickAlgaeCounts = [
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

  const [placeAlgaeNetShot, setPlaceAlgaeNetShot] = useState(
    states?.inputs?.auto?.algae?.placeNetShot || 0
  );
  const [placeAlgaeProcessor, setPlaceAlgaeProcessor] = useState(
    states?.inputs?.auto?.algae?.placeProcessor || 0
  );
  const [placeAlgaeDropMiss, setPlaceAlgaeDropMiss] = useState(
    states?.inputs?.auto?.algae?.placeDropMiss || 0
  );

  const placeAlgaeCounts = [
    {
      position: "Net Shot",
      count: placeAlgaeNetShot,
      setCount: setPlaceAlgaeNetShot,
    },
    {
      position: "Processor",
      count: placeAlgaeProcessor,
      setCount: setPlaceAlgaeProcessor,
    },
    {
      position: "Drop/Miss",
      count: placeAlgaeDropMiss,
      setCount: setPlaceAlgaeDropMiss,
    },
  ];

  // Function to handle state changes and push current state to stack
  useEffect(() => {
    setStateStack([
      ...stateStack,
      {
        pickCoralStationCount,
        pickCoralMark1Count,
        pickCoralMark2Count,
        pickCoralMark3Count,
        placeCoralL1Count,
        placeCoralL2Count,
        placeCoralL3Count,
        placeCoralL4Count,
        placeCoralDropMissCount,
        pickAlgaeReefCount,
        pickAlgaeMark1Count,
        pickAlgaeMark2Count,
        pickAlgaeMark3Count,
        placeAlgaeNetShot,
        placeAlgaeProcessor,
        placeAlgaeDropMiss,
      },
    ]);
  }, [
    pickCoralStationCount,
    pickCoralMark1Count,
    pickCoralMark2Count,
    pickCoralMark3Count,
    placeCoralL1Count,
    placeCoralL2Count,
    placeCoralL3Count,
    placeCoralL4Count,
    placeCoralDropMissCount,
    pickAlgaeReefCount,
    pickAlgaeMark1Count,
    pickAlgaeMark2Count,
    pickAlgaeMark3Count,
    placeAlgaeNetShot,
    placeAlgaeProcessor,
    placeAlgaeDropMiss,
  ]);

  // Function to handle undo operation
  const handleUndo = () => {
    if (stateStack.length > 1) {
      console.log("Undo1");
      stateStack.pop();
      const previousState = stateStack.pop();
      setPickCoralStationCount(previousState.pickCoralStationCount);
      setPickCoralMark1Count(previousState.pickCoralMark1Count);
      setPickCoralMark2Count(previousState.pickCoralMark2Count);
      setPickCoralMark3Count(previousState.pickCoralMark3Count);
      setPlaceCoralL1Count(previousState.placeCoralL1Count);
      setPlaceCoralL2Count(previousState.placeCoralL2Count);
      setPlaceCoralL3Count(previousState.placeCoralL3Count);
      setPlaceCoralL4Count(previousState.placeCoralL4Count);
      setPlaceCoralDropMissCount(previousState.placeCoralDropMissCount);
      setPickAlgaeReefCount(previousState.pickAlgaeReefCount);
      setPickAlgaeMark1Count(previousState.pickAlgaeMark1Count);
      setPickAlgaeMark2Count(previousState.pickAlgaeMark2Count);
      setPickAlgaeMark3Count(previousState.pickAlgaeMark3Count);
      setPlaceAlgaeNetShot(previousState.placeAlgaeNetShot);
      setPlaceAlgaeProcessor(previousState.placeAlgaeProcessor);
      setPlaceAlgaeDropMiss(previousState.placeAlgaeDropMiss);
      setStateStack([...stateStack]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "5dvh",
        gap: "5dvh",
      }}
    >
      <div style={{ width: "45%", height: "100%" }}>
        <ScoringCoralSection
          pickPositions={pickCoralPositions}
          pickCounts={pickCoralCounts}
          placeCounts={placeCoralCounts}
        />
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5dvh",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "8dvh",
              fontWeight: "bold",
            }}
          >
            Autonomous
          </h1>
          <div
            style={{
              width: "100%",
              height: "75%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2dvw",
              paddingLeft: "2dvw",
              paddingRight: "2dvw",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2.5dvh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "50%",
                }}
              >
                <ProceedBackButton
                  nextPage={`/auto-start`}
                  back={true}
                  inputs={{
                    ...(states?.inputs || {}),
                    auto: {
                      coral: {
                        pickStationCount: pickCoralStationCount,
                        pickMark1Count: pickCoralMark1Count,
                        pickMark2Count: pickCoralMark2Count,
                        pickMark3Count: pickCoralMark3Count,
                        placeL1Count: placeCoralL1Count,
                        placeL2Count: placeCoralL2Count,
                        placeL3Count: placeCoralL3Count,
                        placeL4Count: placeCoralL4Count,
                        placeDropMissCount: placeCoralDropMissCount,
                      },
                      algae: {
                        pickReefCount: pickAlgaeReefCount,
                        pickMark1Count: pickAlgaeMark1Count,
                        pickMark2Count: pickAlgaeMark2Count,
                        pickMark3Count: pickAlgaeMark3Count,
                        placeNetShot: placeAlgaeNetShot,
                        placeProcessor: placeAlgaeProcessor,
                        placeDropMiss: placeAlgaeDropMiss,
                      },
                    },
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1.63dvh solid #1D1E1E",
                  backgroundColor: "#242424",
                  borderRadius: "3.49dvh",
                }}
                onClick={handleUndo}
              >
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: "5.58dvh",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Undo
                </h1>
              </div>
            </div>
            <div style={{ width: "50%", height: "100%" }}>
              <ProceedBackButton
                nextPage={`/teleop-scoring`}
                inputs={{
                  ...(states?.inputs || {}),
                  auto: {
                    coral: {
                      pickStationCount: pickCoralStationCount,
                      pickMark1Count: pickCoralMark1Count,
                      pickMark2Count: pickCoralMark2Count,
                      pickMark3Count: pickCoralMark3Count,
                      placeL1Count: placeCoralL1Count,
                      placeL2Count: placeCoralL2Count,
                      placeL3Count: placeCoralL3Count,
                      placeL4Count: placeCoralL4Count,
                      placeDropMissCount: placeCoralDropMissCount,
                    },
                    algae: {
                      pickReefCount: pickAlgaeReefCount,
                      pickMark1Count: pickAlgaeMark1Count,
                      pickMark2Count: pickAlgaeMark2Count,
                      pickMark3Count: pickAlgaeMark3Count,
                      placeNetShot: placeAlgaeNetShot,
                      placeProcessor: placeAlgaeProcessor,
                      placeDropMiss: placeAlgaeDropMiss,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "55%" }}>
          <ScoringAlgaeSection
            pickPositions={pickAlgaePositions}
            pickCounts={pickAlgaeCounts}
            placeCounts={placeAlgaeCounts}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoScoringPage;
