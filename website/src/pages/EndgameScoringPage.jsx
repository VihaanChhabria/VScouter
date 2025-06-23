import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import EndgameScoringBargeSection from "../components/EndgameScoringComponents/EndgameScoringBargeSection";
import EndgameScoringToggle from "../components/EndgameScoringComponents/EndgameScoringToggle";
import EndgameScoringComments from "../components/EndgameScoringComponents/EndgameScoringComments";

const EndgameScoringPage = () => {
  const location = useLocation();
  const states = location.state;

  const [shallowClimbAttempted, setShallowClimbAttempted] = useState(
    states?.inputs?.shallowClimbAttempted || false
  );
  const [deepClimbAttempted, setDeepClimbAttempted] = useState(
    states?.inputs?.deepClimbAttempted || false
  );
  const [parkAttempted, setParkAttempted] = useState(
    states?.inputs?.parkAttempted || false
  );

  const climbData = [
    {
      position: "Shallow Climb",
      selected: shallowClimbAttempted,
      setSelected: setShallowClimbAttempted,
    },
    {
      position: "Deep Climb",
      selected: deepClimbAttempted,
      setSelected: setDeepClimbAttempted,
    },
    {
      position: "Park",
      selected: parkAttempted,
      setSelected: setParkAttempted,
    },
  ];

  const [climbFailed, setClimbFailed] = useState(
    states?.inputs?.climbFailed || false
  );
  const [playedDefense, setPlayedDefense] = useState(
    states?.inputs?.playedDefense || false
  );
  const [brokeDown, setBrokeDown] = useState(
    states?.inputs?.brokeDown || false
  );

  const [comment, setComment] = useState(states?.inputs?.comment || "");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2dvh", //edit this
        padding: "4dvh 2dvw", //edit this
      }}
    >
      <div style={{ flex: "0.67", width: "100%" }}>
        <EndgameScoringBargeSection climbData={climbData} />
      </div>
      <div
        style={{
          flex: "0.45",
          width: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "1dvw",
        }}
      >
        <div style={{ flex: "1", height: "100%" }}>
          <EndgameScoringToggle
            question={"Climbed Failed"}
            selected={climbFailed}
            setSelected={setClimbFailed}
          />
        </div>
        <div style={{ flex: "1", height: "100%" }}>
          <EndgameScoringToggle
            question={"Played Defense"}
            selected={playedDefense}
            setSelected={setPlayedDefense}
          />
        </div>
        <div style={{ flex: "1", height: "100%" }}>
          <EndgameScoringToggle
            question={"Broke Down"}
            selected={brokeDown}
            setSelected={setBrokeDown}
          />
        </div>
      </div>
      <div
        style={{
          flex: "1",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5dvw",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", flex: "1" }}>
            <EndgameScoringComments comment={comment} setComment={setComment} />
          </div>
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "9dvh",
              fontWeight: "bold",
              width: "100%",
              flex: "0.5",
            }}
          >
            Endgame Scoring
          </h1>
        </div>
        <div
          style={{
            height: "100%",
            width: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2dvh",
          }}
        >
          <div style={{ flex: "0.25", width: "100%" }}>
            <ProceedBackButton
              back={true}
              nextPage="/ui/teleop-scoring"
              inputs={{
                ...(states?.inputs || {}),
                shallowClimbAttempted,
                deepClimbAttempted,
                parkAttempted,
                climbFailed,
                playedDefense,
                brokeDown,
                comment,
              }}
            />
          </div>
          <div style={{ flex: "1", width: "100%" }}>
            <ProceedBackButton
              nextPage={`/ui/game-start`}
              inputs={{
                ...(states?.inputs || {}),
                shallowClimbAttempted,
                deepClimbAttempted,
                parkAttempted,
                climbFailed,
                playedDefense,
                brokeDown,
                comment,
              }}
              message={"Submit"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndgameScoringPage;
