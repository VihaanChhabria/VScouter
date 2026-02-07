import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import ShotInfoSection from "../components/ShotInfoSection";
import PageControlSection from "../components/AutoScoringComponents/PageControlSection";
import TeleopFuelSourceSection from "../components/TeleopScoringComponents/TeleopFuelSourceSection";

const AutoScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [stateStack, setStateStack] = useState([[]]);
  const isUndoingRef = useRef(false);

  const [hopperPercent, setHopperPercent] = useState("80%");
  const [shotsPercent, setShotsPercent] = useState("80%");

  const [fuelOptionSelected, setFuelOptionSelected] = useState("");

  const [fuelShotAndSourceInfo, setFuelShotAndSourceInfo] = useState([]);

  useEffect(() => {
    const savedStack = JSON.parse(
      localStorage.getItem("autoHistory") || "[[]]",
    );

    setStateStack(savedStack);

    if (savedStack.length > 0) {
      // update states with the most recent state in the stack
      setFuelOptionSelected(savedStack[savedStack.length - 1]);
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
    setFuelShotAndSourceInfo(previousState);
  };

  // function to handle undo operation and update state stack
  useEffect(() => {
    if (isUndoingRef.current) {
      isUndoingRef.current = false;
      return;
    }

    if (fuelShotAndSourceInfo.length === 0) return;

    setStateStack((prev) => [...prev, [...fuelShotAndSourceInfo]]);
  }, [fuelShotAndSourceInfo]);

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
          width: "55%",
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
        <TeleopFuelSourceSection
          fuelShotAndSourceInfo={fuelShotAndSourceInfo}
          optionSelected={fuelOptionSelected}
          setOptionSelected={setFuelOptionSelected}
        />
      </div>
      <div
        style={{
          width: "45%",
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
            fuelShotAndSourceInfo: fuelShotAndSourceInfo,
          }}
          pageTitle={"Teleop"}
        />

        <ShotInfoSection
          hopperPercent={hopperPercent}
          setHopperPercent={setHopperPercent}
          shotsPercent={shotsPercent}
          setShotsPercent={setShotsPercent}
          submitOnClick={() => {
            setFuelShotAndSourceInfo((prev) => [
              ...prev,
              {
                source: fuelOptionSelected,
                hopperPercent: hopperPercent,
                shotsPercent: shotsPercent,
              },
            ]);
            setFuelOptionSelected("");
          }}
        />
      </div>
    </div>
  );
};

export default AutoScoringPage;
