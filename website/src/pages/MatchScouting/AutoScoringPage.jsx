import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import SelectOptions from "../../components/SelectOptions";
import AutoPositionSelector from "../../components/AutoScoringComponents/AutoPositionSelector";
import { toast } from "react-toastify";
import ShotInfoSection from "../../components/ShotInfoSection";
import PageControlSection from "../../components/PageControlSection";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [stateStack, setStateStack] = useState([[]]);
  const isUndoingRef = useRef(false);

  const [driveType, setDriveType] = useState("Shot");
  const [robotPositions, setRobotPositions] = useState(
    states?.inputs?.autoRobotPositions || [],
  );
  const [showShotInfo, setShowShotInfo] = useState(false);

  const [hopperPercent, setHopperPercent] = useState("80%");
  const [shotsPercent, setShotsPercent] = useState("80%");

  useEffect(() => {
    const savedStack = JSON.parse(localStorage.getItem("autoHistory") || "[]");

    if (savedStack.length === 0) {
      savedStack.push([]);
    }

    console.log("savedstack:", savedStack);

    setStateStack(savedStack);

    if (savedStack.length > 0) {
      setRobotPositions(savedStack[savedStack.length - 1]);
    }
  }, []);

  // Function to handle undo operation
  const handleUndo = () => {
    if (stateStack.length <= 1) {
      toast.error("No more actions to undo!");
      return;
    }

    isUndoingRef.current = true;

    const newStack = stateStack.slice(0, -1);
    const previousState = newStack[newStack.length - 1];

    setStateStack(newStack);
    setRobotPositions(previousState);
  };

  // function to handle undo operation and update state stack
  useEffect(() => {
    if (isUndoingRef.current) {
      isUndoingRef.current = false;
      return;
    }

    if (robotPositions.length === 0) return;

    const areSame =
      stateStack.length > 0 &&
      JSON.stringify(robotPositions) ===
        JSON.stringify(stateStack[stateStack.length - 1]);

    if (areSame) return;

    setStateStack((prev) => [...prev, [...robotPositions]]);
  }, [robotPositions]);
  // function to handle state changes and push current state to stack
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
        <AutoPositionSelector
          driveType={driveType}
          robotPositions={robotPositions}
          setRobotPositions={setRobotPositions}
          showShotInfo={showShotInfo}
        />
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
        <PageControlSection
          stateStack={stateStack}
          handleUndo={handleUndo}
          states={states}
          extraInputs={{
            autoRobotPositions: robotPositions,
          }}
          pageTitle={"Auto"}
          nextPage={"teleop-scoring"}
          backPage={"game-start"}
        />

        {showShotInfo ? (
          <ShotInfoSection
            hopperPercent={hopperPercent}
            setHopperPercent={setHopperPercent}
            shotsPercent={shotsPercent}
            setShotsPercent={setShotsPercent}
            submitOnClick={() => {
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
          />
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

export default AutoScoringPage;
