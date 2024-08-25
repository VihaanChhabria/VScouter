import React, { useState } from "react";

import blueField from "../../assets/TeleopScoringMapImages/Blue_Alliance.png";
import redField from "../../assets/TeleopScoringMapImages/Red_Alliance.png";
import TeleopScoringCounter from "./TeleopScoringCounter";

const TeleopScoringMap = ({
  flipButtonCoordX = 65.02,
  flipButtonCoordY = 36.74,
  removeButtonCoordX = 65.02,
  removeButtonCoordY = 11.33,
  alliance = "blue",
  counts,
  setCounts,
}) => {
  const [rotate, setRotate] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${alliance == "blue" ? blueField : redField})`,
          backgroundSize: "cover",
          width: "63.41vw",
          height: "100.0vh",
          animationName: rotate ? "rotateRight" : "rotateLeft",
          animationDuration: "400ms",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
          position: "absolute",
          left: "0vw",
          top: "0vh",
        }}
      >
        <TeleopScoringCounter
          coordX={4.5}
          coordY={10.7}
          width={15}
          height={37.9}
          message="Amp Made:"
          backgroundColor="rgba(174, 243, 142, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.ampMadeCount}
          setCount={setCounts.setAmpMadeCount}
        />
        <TeleopScoringCounter
          coordX={19.5}
          coordY={10.7}
          width={15}
          height={37.9}
          message="Amp Missed:"
          backgroundColor="rgba(255, 149, 149, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.ampMissedCount}
          setCount={setCounts.setAmpMissedCount}
        />

        <TeleopScoringCounter
          coordX={4.5}
          coordY={48.6}
          width={15}
          height={51.5}
          message="Speaker Made:"
          backgroundColor="rgba(174, 243, 142, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.speakerMadeCount}
          setCount={setCounts.setSpeakerMadeCount}
        />
        <TeleopScoringCounter
          coordX={19.5}
          coordY={48.6}
          width={15}
          height={51.5}
          message="Speaker Missed:"
          backgroundColor="rgba(255, 149, 149, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.speakerMissedCount}
          setCount={setCounts.setSpeakerMissedCount}
        />

        <TeleopScoringCounter
          coordX={34.5}
          coordY={10.7}
          width={14.45}
          height={89.4}
          message="Fed Made:"
          backgroundColor="rgba(174, 243, 142, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.fedMadeCount}
          setCount={setCounts.setFedMadeCount}
        />
        <TeleopScoringCounter
          coordX={48.95}
          coordY={10.7}
          width={14.45}
          height={89.4}
          message="Fed Missed:"
          backgroundColor="rgba(255, 149, 149, 0.5)"
          rotated={rotate}
          removed={remove}
          setRemoved={setRemove}
          count={counts.fedMissedCount}
          setCount={setCounts.setFedMissedCount}
        />
      </div>

      <div
        style={{
          width: "33.8vw",
          height: "23.72vh",
          backgroundColor: "#4A4A4A",
          border: `${rotate ? "4.65" : "1.63"}vh solid #1D1E1E`,
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${flipButtonCoordX}vw`,
          top: `${flipButtonCoordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setRotate(!rotate)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>Flip Field</h1>
      </div>

      <div
        style={{
          width: "33.8vw",
          height: "23.72vh",
          backgroundColor: "#4A4A4A",
          border: `${remove ? "4.65" : "1.63"}vh solid #1D1E1E`,
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${removeButtonCoordX}vw`,
          top: `${removeButtonCoordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
        onClick={() => setRemove(!remove)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>Remove Count</h1>
      </div>
    </>
  );
};

export default TeleopScoringMap;
