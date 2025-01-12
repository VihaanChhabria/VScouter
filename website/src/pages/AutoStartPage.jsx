import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartMap from "../components/AutoStartComponents/AutoStartMap";
import AutoStartNoShowButton from "../components/AutoStartComponents/AutoStartNoShowButton";
import AutoStartCounter from "../components/AutoStartComponents/AutoStartCounter";
import ToggleButton from "../components/ToggleButton";

/**
 * Renders a component representing the Auto Start page.
 *
 * To be used before the auto starts, collecting information such as if the robot showed up and where the robot started.
 *
 * @return {JSX.Element} The component representing the Auto Start page.
 */
const AutoStartPage = () => {
  const location = useLocation();
  const states = location.state;

  // Initialize the state with the passed in state from the previous page, or null if no state was passed in

  const [startPos1, setStartPos1] = useState(
    states?.inputs?.startPoses?.startPos1 || null
  );
  const [startPos2, setStartPos2] = useState(
    states?.inputs?.startPoses?.startPos2 || null
  );
  const [startPos3, setStartPos3] = useState(
    states?.inputs?.startPoses?.startPos3 || null
  );
  const [startPos4, setStartPos4] = useState(
    states?.inputs?.startPoses?.startPos4 || null
  );
  const [startPos5, setStartPos5] = useState(
    states?.inputs?.startPoses?.startPos5 || null
  );
  const [startPos6, setStartPos6] = useState(
    states?.inputs?.startPoses?.startPos6 || null
  );

  const startPoses = [
    startPos1,
    startPos2,
    startPos3,
    startPos4,
    startPos5,
    startPos6,
  ];
  const setStartPoses = [
    setStartPos1,
    setStartPos2,
    setStartPos3,
    setStartPos4,
    setStartPos5,
    setStartPos6,
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "5dvh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "5dvw",
      }}
    >
      <div style={{ width: "70%", height: "100%", backgroundColor: "red" }}>
        <AutoStartMap startPoses={startPoses} setStartPoses={setStartPoses} />
      </div>

      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2dvh",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "10dvh", fontWeight: "bold", color: "white"}}>Auto Start</h1>
        <h1 style={{ textAlign: "center", fontSize: "4.5dvh", fontWeight: "semibold", color: "white"}}>
          Click where your robot starts on the field.
        </h1>
        <div style={{ width: "100%", height: "30%" }}>
          <ProceedBackButton
            back={true}
            nextPage="/game-start"
            inputs={{
              ...(states?.inputs || {}),
              startPoses: startPoses,
            }}
          />
        </div>
        <div style={{ width: "100%", height: "50%" }}>
          <ProceedBackButton
            nextPage={"/auto-scoring"}
            inputs={{
              ...(states?.inputs || {}),
              startPoses: startPoses,
            }}
          />
        </div>
      </div>
      {/* <AutoStartMap /> */}
    </div>
    // <>
    //   {/* Render the auto start map */}
    //   <AutoStartMap alliance={states?.inputs?.alliance || "blue"} />

    //   {/* Button to proceed to the next page (either endgame or auto scoring based on if the robot showed up) and pass in the selected data as props */}
    //   <ProceedBackButton
    //     nextPage={noShow ? `/endgame-scoring` : `/auto-scoring`}
    //     inputs={{
    //       ...(states?.inputs || {}),
    //       noShow: noShow,
    //       autoStartPos: startCounter,
    //     }}
    //   />

    //   {/* Button to go back to the previous page and pass in the selected data as props*/}
    //   <ProceedBackButton
    //     back={true}
    //     nextPage="/game-start"
    //     inputs={{
    //       ...(states?.inputs || {}),
    //       noShow: noShow,
    //       autoStartPos: startCounter,
    //     }}
    //   />
    // </>
  );
};

export default AutoStartPage;
