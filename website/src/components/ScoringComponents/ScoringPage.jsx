import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScoringCoralSection from "./ScoringCoral/ScoringCoralSection";
import ScoringAlgaeSection from "./ScoringAlgae/ScoringAlgaeSection";
import ProceedBackButton from "../ProceedBackButton";

import SelectOptions from "../SelectOptions";
import PositionSelector from "../AutoComponents/PositionSelector";
import ScoringPickup from "./ScoringPickup";

const ScoringPage = ({ statePath, mode, nextPage, pastPage }) => {
  const location = useLocation();
  const states = location.state;

  const [placeCoralL1Count, setPlaceCoralL1Count] = useState(
    statePath?.coral?.placeL1Count || 0,
  );
  const [placeCoralL2Count, setPlaceCoralL2Count] = useState(
    statePath?.coral?.placeL2Count || 0,
  );
  const [placeCoralL3Count, setPlaceCoralL3Count] = useState(
    statePath?.coral?.placeL3Count || 0,
  );
  const [placeCoralL4Count, setPlaceCoralL4Count] = useState(
    statePath?.coral?.placeL4Count || 0,
  );
  const [placeCoralDropMissCount, setPlaceCoralDropMissCount] = useState(
    statePath?.coral?.placeDropMissCount || 0,
  );

  // Algae States
  const [placeAlgaeNetShot, setPlaceAlgaeNetShot] = useState(
    statePath?.algae?.placeNetShot || 0,
  );
  const [placeAlgaeProcessor, setPlaceAlgaeProcessor] = useState(
    statePath?.algae?.placeProcessor || 0,
  );
  const [placeAlgaeDropMiss, setPlaceAlgaeDropMiss] = useState(
    statePath?.algae?.placeDropMiss || 0,
  );

  // // State stack for undo functionality
  // const [stateStack, setStateStack] = useState(
  //   JSON.parse(localStorage.getItem(mode + "History"))?.slice(0, -1) || [],
  // );

  const [driveType, setDriveType] = useState("Shot");
  const [robotPositions, setRobotPositions] = useState([]);
  const [showShotInfo, setShowShotInfo] = useState(false);

  const [hopperPercent, setHopperPercent] = useState("80%");
  const [shotsPercent, setShotsPercent] = useState("80%");

  const [stateStack, setStateStack] = useState([]);

  // function to handle state changes and push current state to stack
  useEffect(() => {
    setStateStack((prev) => [...prev, robotPositions]);
  }, [robotPositions]);

  // Function to handle undo operation
  const handleUndo = () => {
    if (stateStack.length > 1) {
      stateStack.pop();
      const previousState = stateStack.pop();
      
      setRobotPositions(previousState);
    }
  };

  useEffect(() => {
    if (
      robotPositions.length > 0 &&
      robotPositions[robotPositions.length - 1].driveType === "Shot" &&
      !robotPositions[robotPositions.length - 1].shotInfo
    ) {
      setShowShotInfo(true);
    } else {
      setShowShotInfo(false);
      setDriveType("Drive");
    }
  }, [robotPositions]);

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
      <div
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5dvh",
        }}
      >
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
          <PositionSelector
            driveType={driveType}
            robotPositions={robotPositions}
            setRobotPositions={setRobotPositions}
            showShotInfo={showShotInfo}
          />
        </div>
      </div>
      <div
        style={{
          width: "40%",
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
            }}
          >
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "8dvh",
                fontWeight: "bold",
              }}
            >
              Auto
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
                  mode={mode}
                  // stateStack={stateStack}
                  nextPage={pastPage}
                  back={true}
                  // inputs={{
                  //   ...(states?.inputs || {}),
                  //   [mode]: {
                  //     coral: Object.assign(
                  //       {
                  //         placeL1Count: placeCoralL1Count,
                  //         placeL2Count: placeCoralL2Count,
                  //         placeL3Count: placeCoralL3Count,
                  //         placeL4Count: placeCoralL4Count,
                  //         placeDropMissCount: placeCoralDropMissCount,
                  //       },
                  //       ...pickCoralData.map((singleCoralData) => ({
                  //         ["pick" +
                  //         singleCoralData.position.replace(" ", "") +
                  //         "Count"]: singleCoralData.count,
                  //       })),
                  //     ),
                  //     algae: Object.assign(
                  //       {
                  //         placeNetShot: placeAlgaeNetShot,
                  //         placeProcessor: placeAlgaeProcessor,
                  //         placeDropMiss: placeAlgaeDropMiss,
                  //       },
                  //       ...pickAlgaeData.map((singleAlgaeData) => ({
                  //         ["pick" +
                  //         singleAlgaeData.position.replace(" ", "") +
                  //         "Count"]: singleAlgaeData.count,
                  //       })),
                  //     ),
                  //     ...(mode === "auto" && {
                  //       passedStartLine,
                  //       coralPreloaded,
                  //     }),
                  //   },
                  // }}
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
                mode={mode}
                // stateStack={stateStack}
                nextPage={nextPage}
                // inputs={{
                //   ...(states?.inputs || {}),
                //   [mode]: {
                //     coral: Object.assign(
                //       {
                //         placeL1Count: placeCoralL1Count,
                //         placeL2Count: placeCoralL2Count,
                //         placeL3Count: placeCoralL3Count,
                //         placeL4Count: placeCoralL4Count,
                //         placeDropMissCount: placeCoralDropMissCount,
                //       },
                //       ...pickCoralData.map((singleCoralData) => ({
                //         ["pick" +
                //         singleCoralData.position.replace(" ", "") +
                //         "Count"]: singleCoralData.count,
                //       })),
                //     ),
                //     algae: Object.assign(
                //       {
                //         placeNetShot: placeAlgaeNetShot,
                //         placeProcessor: placeAlgaeProcessor,
                //         placeDropMiss: placeAlgaeDropMiss,
                //       },
                //       ...pickAlgaeData.map((singleAlgaeData) => ({
                //         ["pick" +
                //         singleAlgaeData.position.replace(" ", "") +
                //         "Count"]: singleAlgaeData.count,
                //       })),
                //     ),
                //     ...(mode === "auto" && { passedStartLine }),
                //   },
                // }}
              />
            </div>
          </div>
        </div>
        {showShotInfo ? (
          <div
            style={{
              backgroundColor: "#3B3B3B",
              borderColor: "#1D1E1E",
              borderWidth: "2dvh",
              borderRadius: "3.49dvh",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1dvh",
              padding: "2.5dvh",
            }}
          >
            {/* Title */}
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "3.5dvh",
                fontWeight: "bold",
              }}
            >
              Select Shooting Data
            </h2>

            {/* Percent of Hopper Filled */}
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                gap: "1dvh",
              }}
            >
              <h1
                style={{
                  color: "#FFFFFF",
                  fontSize: "3dvh",
                  fontWeight: "500",
                }}
              >
                Percent of Hopper Filled ±10%
              </h1>

              <SelectOptions
                optionsData={["20%", "50%", "80%"]}
                optionSelected={hopperPercent}
                setOptionSelected={setHopperPercent}
                flexDirection="row"
              />
            </div>

            {/* Percent of Shots Successful */}
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                gap: "1dvh",
              }}
            >
              <h1
                style={{
                  color: "#FFFFFF",
                  fontSize: "3dvh",
                  fontWeight: "500",
                }}
              >
                Percent of Shots Successful ±10%
              </h1>

              <SelectOptions
                optionsData={["20%", "50%", "80%"]}
                optionSelected={shotsPercent}
                setOptionSelected={setShotsPercent}
                flexDirection="row"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                setRobotPositions((prev) => [
                  ...prev.slice(0, prev.length - 1),
                  {
                    x: robotPositions[robotPositions.length - 1].x,
                    y: robotPositions[robotPositions.length - 1].y,
                    driveType: "Shot",
                    shotInfo: {
                      hopperPercent: hopperPercent,
                      shotsPercent: shotsPercent,
                    },
                  },
                ]);
              }}
              style={{
                marginTop: "1dvh",
                padding: "1.5dvh 4dvh",
                fontSize: "3.5dvh",
                fontWeight: "bold",
                color: "#FFFFFF",
                backgroundColor: "#507144",
                border: "none",
                borderRadius: "2dvh",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <div style={{ height: "65%", width: "100%" }}>
            <SelectOptions
              optionsData={["Drive", "Shot"]}
              optionSelected={driveType}
              setOptionSelected={setDriveType}
              flexDirection="column"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoringPage;
