import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import ToggleButton from "../components/ToggleButton";
import EndgameScoringTrapCounter from "../components/EndgameScoringComponents/EndgameScoringTrapCounter";
import EndgameScoringClimbParkToggles from "../components/EndgameScoringComponents/EndgameScoringClimbParkToggles";

const EndgameScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [parked, setParked] = useState(states?.inputs?.parked || false);
  const [parkFailed, setParkFailed] = useState(
    states?.inputs?.parkFailed || false
  );

  const [climbed, setClimbed] = useState(states?.inputs?.climbed || false);
  const [climbFailed, setClimbFailed] = useState(
    states?.inputs?.climbFailed || false
  );

  const [trapMadeCount, setTrapMadeCount] = useState(
    states?.inputs?.trapMadeCount || 0
  );
  const [trapMissedCount, setTrapMissedCount] = useState(
    states?.inputs?.trapMissedCount || 0
  );

  const [comment, setComment] = useState(states?.inputs?.comment || "");

  const trapMadeMissedTextStyle = {
    color: "#FFFFFF",
    fontSize: "7.44dvh",
    fontWeight: "bold",
    userSelect: "none",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "22dvw",
    overflow: "hidden",
  };

  return (
    <>
      <EndgameScoringClimbParkToggles
        states={{ parked, parkFailed, climbed, climbFailed }}
        setStates={{ setParked, setParkFailed, setClimbed, setClimbFailed }}
      />

      <div>
        <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          <h1
            style={{
              ...trapMadeMissedTextStyle,
              left: "52.58dvw",
              top: "1.86dvh",
              textAlign: "center",
            }}
          >
            Trap Made:
          </h1>
          <EndgameScoringTrapCounter
            coordX={56.65}
            coordY={16.51}
            counter={trapMadeCount}
            setCounter={setTrapMadeCount}
          />
        </div>
        <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          <h1
            style={{
              ...trapMadeMissedTextStyle,
              left: "75.32dvw",
              top: "1.86dvh",
              textAlign: "center",
            }}
          >
            Trap Missed:
          </h1>
          <EndgameScoringTrapCounter
            coordX={79.4}
            coordY={16.51}
            counter={trapMissedCount}
            setCounter={setTrapMissedCount}
          />
        </div>
      </div>

      <div>
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
            userSelect: "none",
            position: "absolute",
            left: "2.04dvw",
            top: "64.88dvh",
          }}
        >
          Comments:
        </h1>
        <textarea
          style={{
            left: "17.5dvw",
            top: "64.88dvh",
            position: "absolute",
            width: "46.67dvw",
            height: "32.79dvh",
            border: "0.93dvh solid #1D1E1E",
            borderRadius: "2.33dvh",
            backgroundColor: "#4A4A4A",
            color: "#FFFFFF",
            fontSize: "3.0dvh",
            padding: "1.56dvh",
          }}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <ProceedBackButton
        nextPage={`/game-start`}
        inputs={{
          ...(states?.inputs || {}),
          parked,
          parkFailed,
          climbed,
          climbFailed,
          trapMadeCount,
          trapMissedCount,
          comment,
        }}
      />
      <ProceedBackButton
        back={true}
        nextPage="/teleop-scoring"
        inputs={{
          ...(states?.inputs || {}),
          parked,
          parkFailed,
          climbed,
          climbFailed,
          trapMadeCount,
          trapMissedCount,
          comment,
        }}
      />
    </>
  );
};

export default EndgameScoringPage;
