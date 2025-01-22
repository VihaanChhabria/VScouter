import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScoringCoralSection from "./ScoringCoral/ScoringCoralSection";
import ScoringAlgaeSection from "./ScoringAlgae/ScoringAlgaeSection";
import ProceedBackButton from "../ProceedBackButton";

const ScoringPage = ({
  pickCoralPositions,
  pickAlgaePositions,
  statePath,
  mode,
  nextPage,
  pastPage,
  pickCoralCounts,
  pickCoralData,
  pickAlgaeCounts,
  pickAlgaeData,
}) => {
  const location = useLocation();
  const states = location.state;

  // Coral States

  // const [pickCoralStationCount, setPickCoralStationCount] = useState(
  //   statePath?.coral?.pickStationCount || 0
  // );
  // const [pickCoralMark1Count, setPickCoralMark1Count] = useState(
  //   statePath?.coral?.pickMark1Count || 0
  // );
  // const [pickCoralMark2Count, setPickCoralMark2Count] = useState(
  //   statePath?.coral?.pickMark2Count || 0
  // );
  // const [pickCoralMark3Count, setPickCoralMark3Count] = useState(
  //   statePath?.coral?.pickMark3Count || 0
  // );

  // const pickCoralData = [
  //   {
  //     position: "Station",
  //     count: pickCoralStationCount,
  //     setCount: setPickCoralStationCount,
  //   },
  //   {
  //     position: "Mark 1",
  //     count: pickCoralMark1Count,
  //     setCount: setPickCoralMark1Count,
  //   },
  //   {
  //     position: "Mark 2",
  //     count: pickCoralMark2Count,
  //     setCount: setPickCoralMark2Count,
  //   },
  //   {
  //     position: "Mark 3",
  //     count: pickCoralMark3Count,
  //     setCount: setPickCoralMark3Count,
  //   },
  // ];

  const [placeCoralL1Count, setPlaceCoralL1Count] = useState(
    statePath?.coral?.placeL1Count || 0
  );
  const [placeCoralL2Count, setPlaceCoralL2Count] = useState(
    statePath?.coral?.placeL2Count || 0
  );
  const [placeCoralL3Count, setPlaceCoralL3Count] = useState(
    statePath?.coral?.placeL3Count || 0
  );
  const [placeCoralL4Count, setPlaceCoralL4Count] = useState(
    statePath?.coral?.placeL4Count || 0
  );
  const [placeCoralDropMissCount, setPlaceCoralDropMissCount] = useState(
    statePath?.coral?.placeDropMissCount || 0
  );

  const placeCoralCounts = [
    {
      position: "L4",
      count: placeCoralL4Count,
      setCount: setPlaceCoralL4Count,
    },
    {
      position: "L3",
      count: placeCoralL3Count,
      setCount: setPlaceCoralL3Count,
    },
    {
      position: "L2",
      count: placeCoralL2Count,
      setCount: setPlaceCoralL2Count,
    },
    {
      position: "L1",
      count: placeCoralL1Count,
      setCount: setPlaceCoralL1Count,
    },
    {
      position: "Drop/Miss",
      count: placeCoralDropMissCount,
      setCount: setPlaceCoralDropMissCount,
    },
  ];

  // Algae States

  const [placeAlgaeNetShot, setPlaceAlgaeNetShot] = useState(
    statePath?.algae?.placeNetShot || 0
  );
  const [placeAlgaeProcessor, setPlaceAlgaeProcessor] = useState(
    statePath?.algae?.placeProcessor || 0
  );
  const [placeAlgaeDropMiss, setPlaceAlgaeDropMiss] = useState(
    statePath?.algae?.placeDropMiss || 0
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

  // State stack for undo functionality
  const [stateStack, setStateStack] = useState([]);

  // Function to handle state changes and push current state to stack
  useEffect(() => {
    setStateStack([
      ...stateStack,
      {
        ...pickCoralCounts,
        placeCoralL1Count,
        placeCoralL2Count,
        placeCoralL3Count,
        placeCoralL4Count,
        placeCoralDropMissCount,
        ...pickAlgaeCounts,
        placeAlgaeNetShot,
        placeAlgaeProcessor,
        placeAlgaeDropMiss,
      },
    ]);
  }, [
    ...pickCoralCounts,
    placeCoralL1Count,
    placeCoralL2Count,
    placeCoralL3Count,
    placeCoralL4Count,
    placeCoralDropMissCount,
    ...pickAlgaeCounts,
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
      for (let i = 0; i < pickCoralData.length; i++) {
        pickCoralData[i].setCount(
          previousState["pickCoral" + pickCoralData[i].position + "Count"]
        );
      }
      setPlaceCoralL1Count(previousState.placeCoralL1Count);
      setPlaceCoralL2Count(previousState.placeCoralL2Count);
      setPlaceCoralL3Count(previousState.placeCoralL3Count);
      setPlaceCoralL4Count(previousState.placeCoralL4Count);
      setPlaceCoralDropMissCount(previousState.placeCoralDropMissCount);

      for (let i = 0; i < pickAlgaeData.length; i++) {
        pickAlgaeData[i].setCount(
          previousState["pickCoral" + pickAlgaeData[i].position + "Count"]
        );
      }

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
          pickCounts={pickCoralData}
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
          <div
            style={{
              width: "100%",
              height: "25%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5dvw",
            }}
          >
            <h1
              style={{
                color: mode == "auto" ? "#EEE1B3" : "#00A6A6",
                fontSize: "8dvh",
                fontWeight: "900",
              }}
            >
              ————
            </h1>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "8dvh",
                fontWeight: "bold",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </h1>
            <h1
              style={{
                color: mode == "auto" ? "#EEE1B3" : "#00A6A6",
                fontSize: "8dvh",
                fontWeight: "900",
              }}
            >
              ————
            </h1>
          </div>

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
                  nextPage={pastPage}
                  back={true}
                  inputs={{
                    ...(states?.inputs || {}),
                    [mode]: {
                      coral: Object.assign(
                        {
                          placeL1Count: placeCoralL1Count,
                          placeL2Count: placeCoralL2Count,
                          placeL3Count: placeCoralL3Count,
                          placeL4Count: placeCoralL4Count,
                          placeDropMissCount: placeCoralDropMissCount,
                        },
                        ...pickCoralCounts.map((count, index) => ({
                          ["pick" +
                          pickCoralData[index].position.replace(" ", "") +
                          "Count"]: count,
                        }))
                      ),
                      algae: Object.assign(
                        {
                          placeNetShot: placeAlgaeNetShot,
                          placeProcessor: placeAlgaeProcessor,
                          placeDropMiss: placeAlgaeDropMiss,
                        },
                        ...pickAlgaeCounts.map((count, index) => ({
                          ["pick" +
                          pickAlgaeData[index].position.replace(" ", "") +
                          "Count"]: count,
                        }))
                      ),
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
                nextPage={nextPage}
                inputs={{
                  ...(states?.inputs || {}),
                  [mode]: {
                    coral: Object.assign(
                      {
                        placeL1Count: placeCoralL1Count,
                        placeL2Count: placeCoralL2Count,
                        placeL3Count: placeCoralL3Count,
                        placeL4Count: placeCoralL4Count,
                        placeDropMissCount: placeCoralDropMissCount,
                      },
                      ...pickCoralCounts.map((count, index) => ({
                        ["pick" +
                        pickCoralData[index].position.replace(" ", "") +
                        "Count"]: count,
                      }))
                    ),
                    algae: Object.assign(
                      {
                        placeNetShot: placeAlgaeNetShot,
                        placeProcessor: placeAlgaeProcessor,
                        placeDropMiss: placeAlgaeDropMiss,
                      },
                      ...pickAlgaeCounts.map((count, index) => ({
                        ["pick" +
                        pickAlgaeData[index].position.replace(" ", "") +
                        "Count"]: count,
                      }))
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "55%" }}>
          <ScoringAlgaeSection
            pickPositions={pickAlgaePositions}
            pickCounts={pickAlgaeData}
            placeCounts={placeAlgaeCounts}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoringPage;
