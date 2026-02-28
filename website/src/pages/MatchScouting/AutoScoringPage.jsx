import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import SelectOptions from "../../components/SelectOptions";
import AutoPositionSelector from "../../components/MatchScouting/AutoScoringComponents/AutoPositionSelector";
import { toast } from "react-toastify";
import ShotInfoSection from "../../components/ShotInfoSection";
import PageControlSection from "../../components/PageControlSection";
import { useMatchTimer } from "../../utils/useMatchTimer";

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
  const [proceedBlinking, setProceedBlinking] = useState(false);
  const [proceedBlinkOn, setProceedBlinkOn] = useState(false);

  const { timerStarted, elapsedMs, elapsedSeconds, start } = useMatchTimer();
  const currentTimeSeconds = () => Number(elapsedSeconds.toFixed(2));

  // Wrapper around setRobotPositions to timestamp each new entry
  const updateRobotPositions = (updater) => {
    setRobotPositions((prev) => {
      const next =
        typeof updater === "function"
          ? updater(prev)
          : Array.isArray(updater)
            ? updater
            : prev;

      if (!Array.isArray(next)) return prev;

      const prevLen = prev.length;
      const nextLen = next.length;

      // If exactly one new position was added, stamp it with the current auto time
      if (nextLen === prevLen + 1) {
        const lastIndex = nextLen - 1;
        const lastPos = next[lastIndex];

        if (lastPos && lastPos.timeSeconds == null) {
          const timeSeconds = currentTimeSeconds();
          return [...next.slice(0, lastIndex), { ...lastPos, timeSeconds }];
        }
      }

      return next;
    });
  };

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

  // When timer passes 25 seconds, begin blinking the proceed button
  useEffect(() => {
    if (timerStarted && elapsedMs >= 25000 && !proceedBlinking) {
      setProceedBlinking(true);
    }
  }, [timerStarted, elapsedMs, proceedBlinking]);

  useEffect(() => {
    if (!proceedBlinking) {
      setProceedBlinkOn(false);
      return;
    }

    const id = setInterval(() => {
      setProceedBlinkOn((prev) => !prev);
    }, 500);

    return () => clearInterval(id);
  }, [proceedBlinking]);

  const handleBeforeProceed = () => {
    if (!timerStarted) {
      toast.error("Start the timer before proceeding.");
      return false;
    }

    if (
      robotPositions.length > 0 &&
      robotPositions[robotPositions.length - 1].driveType === "Shot" &&
      !robotPositions[robotPositions.length - 1].shotInfo
    ) {
      toast.error("Complete the current shot's data before proceeding.");
      return false;
    }
  };

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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2dvh",
          right: "1.5dvw",
          padding: "1dvh 1.5dvw",
          borderRadius: "2dvh",
          backgroundColor: "#242424",
          border: "0.8dvh solid #1D1E1E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "7dvw",
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "3dvh",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {currentTimeSeconds().toFixed(1)}s
        </span>
      </div>
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
        {!timerStarted ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3dvh",
            }}
          >
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "5dvh",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Start Autonomous
            </h2>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: "1.63dvh solid #1D1E1E",
                backgroundColor: "#242424",
                borderRadius: "3.49dvh",
                padding: "2dvh 0",
              }}
              onClick={start}
            >
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "4dvh",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Start Timer
              </h3>
            </div>
            <p
              style={{
                color: "#CCCCCC",
                fontSize: "2.5dvh",
                textAlign: "center",
                margin: 0,
                maxWidth: "80%",
              }}
            >
              Start the timer to begin placing auto robot positions and to
              enable proceeding to the next page.
            </p>
          </div>
        ) : (
          <AutoPositionSelector
            driveType={driveType}
            robotPositions={robotPositions}
            setRobotPositions={updateRobotPositions}
            showShotInfo={showShotInfo}
            timerStarted={timerStarted}
            alliance={states?.inputs?.alliance}
          />
        )}
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
          proceedOnClick={handleBeforeProceed}
          proceedIsAlert={proceedBlinkOn}
        />

        {showShotInfo ? (
          <ShotInfoSection
            hopperPercent={hopperPercent}
            setHopperPercent={setHopperPercent}
            shotsPercent={shotsPercent}
            setShotsPercent={setShotsPercent}
            submitOnClick={() => {
              setRobotPositions((prev) => {
                if (prev.length === 0) return prev;

                const last = prev[prev.length - 1];
                const updatedLast = {
                  x: robotPositions[robotPositions.length - 1].x,
                  y: robotPositions[robotPositions.length - 1].y,
                  driveType: "Shot",
                  shotInfo: {
                    hopperPercent: hopperPercent,
                    shotsPercent: shotsPercent,
                  },
                  timeSeconds: last.timeSeconds,
                };

                return [...prev.slice(0, prev.length - 1), updatedLast];
              });
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
