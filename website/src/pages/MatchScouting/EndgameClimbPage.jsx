import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EndgameClimbPositionSelector from "../../components/MatchScouting/EndgameClimbComponents/EndgameClimbPositionSelector";
import EndgameClimbControlSection from "../../components/MatchScouting/EndgameClimbComponents/EndgameClimbControlSection";
import EndgameClimbTimeSection from "../../components/MatchScouting/EndgameClimbComponents/EndgameClimbTimeSection";

const getFlipField = () => {
  try {
    return localStorage.getItem("flipField") === "false";
  } catch {
    return false;
  }
};

const EndgameClimbPage = () => {
  const location = useLocation();
  const states = location.state;
  const [flipField] = useState(getFlipField);

  const [climbPosition, setClimbPosition] = useState(
    states?.inputs?.climbPosition || "",
  );

  const [climbTimeSeconds, setClimbTimeSeconds] = useState(
    states?.inputs?.climbTimeSeconds || 0,
  );
  const [climbFailed, setClimbFailed] = useState(
    states?.inputs?.climbFailed || false,
  );

  useEffect(() => {
    if (climbPosition === "" || climbPosition === null) {
      setClimbTimeSeconds(0);
      setClimbFailed(false);
    }
  }, [climbPosition]);

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
          width: "55%",
          height: "100%",
          backgroundColor: "#3B3B3B",
          borderColor: "#1D1E1E",
          borderWidth: "2dvh",
          borderRadius: "3.49dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
          <EndgameClimbPositionSelector
            alliance={states?.inputs?.alliance}
            climbPosition={climbPosition}
            setClimbPosition={setClimbPosition}
            flipField={flipField}
          />
        </div>
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
        <div style={{ width: "100%", height: "30%" }}>
          <EndgameClimbControlSection
            states={states}
            extraInputs={{
              climbPosition: climbPosition,
              climbTimeSeconds: climbTimeSeconds,
              climbFailed: climbFailed,
            }}
          />
        </div>

        <div style={{ width: "100%", height: "70%" }}>
          <EndgameClimbTimeSection
            climbPosition={climbPosition}
            climbTimeSeconds={climbTimeSeconds}
            setClimbTimeSeconds={setClimbTimeSeconds}
            climbFailed={climbFailed}
            setClimbFailed={setClimbFailed}
          />
        </div>
      </div>
    </div>
  );
};

export default EndgameClimbPage;
