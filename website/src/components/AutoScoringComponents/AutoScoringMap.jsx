import React, { useState } from "react";

import blueField from "../../assets/AutoScoringMapImages/Blue_Alliance.png";
import redField from "../../assets/AutoScoringMapImages/Red_Alliance.png";

import AutoScoringNoteStatus from "./AutoScoringNoteStatus";

const AutoScoringMap = ({
  buttonCoordX = 65.02,
  buttonCoordY = 36.74,
  alliance = "blue",
  ringStatuses,
  setRingStatuses,
}) => {
  const [rotate, setRotate] = useState(false);

  const closeRingsStatusXCoord = alliance == "blue" ? 4.0 : 39.0;
  const farRingsStatusXCoord = alliance == "blue" ? 39.0 : 4.0;

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
        <AutoScoringNoteStatus
          coordX={closeRingsStatusXCoord}
          coordY={8.84}
          rotated={rotate}
          status={ringStatuses.closeRing1}
          setStatus={setRingStatuses.setCloseRing1}
        />
        <AutoScoringNoteStatus
          coordX={closeRingsStatusXCoord}
          coordY={24.88}
          rotated={rotate}
          status={ringStatuses.closeRing2}
          setStatus={setRingStatuses.setCloseRing2}
        />
        <AutoScoringNoteStatus
          coordX={closeRingsStatusXCoord}
          coordY={40.93}
          rotated={rotate}
          status={ringStatuses.closeRing3}
          setStatus={setRingStatuses.setCloseRing3}
        />

        <AutoScoringNoteStatus
          coordX={farRingsStatusXCoord}
          coordY={4.65}
          rotated={rotate}
          status={ringStatuses.farRing1}
          setStatus={setRingStatuses.setFarRing1}
        />
        <AutoScoringNoteStatus
          coordX={farRingsStatusXCoord}
          coordY={23.02}
          rotated={rotate}
          status={ringStatuses.farRing2}
          setStatus={setRingStatuses.setFarRing2}
        />
        <AutoScoringNoteStatus
          coordX={farRingsStatusXCoord}
          coordY={40.7}
          rotated={rotate}
          status={ringStatuses.farRing3}
          setStatus={setRingStatuses.setFarRing3}
        />
        <AutoScoringNoteStatus
          coordX={farRingsStatusXCoord}
          coordY={59.07}
          rotated={rotate}
          status={ringStatuses.farRing4}
          setStatus={setRingStatuses.setFarRing4}
        />
        <AutoScoringNoteStatus
          coordX={farRingsStatusXCoord}
          coordY={77.67}
          rotated={rotate}
          status={ringStatuses.farRing5}
          setStatus={setRingStatuses.setFarRing5}
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
          left: `${buttonCoordX}vw`,
          top: `${buttonCoordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setRotate(!rotate)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>Flip Field</h1>
      </div>
    </>
  );
};

export default AutoScoringMap;
