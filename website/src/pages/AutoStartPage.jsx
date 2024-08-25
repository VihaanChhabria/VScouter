import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProceedBackButton from "../components/ProceedBackButton";
import AutoStartMap from "../components/AutoStartComponents/AutoStartMap";
import AutoStartNoShowButton from "../components/AutoStartComponents/AutoStartNoShowButton";
import AutoStartCounter from "../components/AutoStartComponents/AutoStartCounter";

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
  const [noShow, setNoShow] = useState(states?.inputs?.noShow || false);
  const [startCounter, setStartCounter] = useState(states?.inputs?.startCounter || 1);

  return (
    <>
      {/* Render the auto start map */}
      <AutoStartMap alliance={states?.inputs?.alliance || "blue"} />

      {/* Button to select whether the robot showed up or not */}
      <AutoStartNoShowButton noShow={noShow} setNoShow={setNoShow} />

      {/* If the robot showed up, render the counter to select the start position */}
      {!noShow && (
        <AutoStartCounter startCounter={startCounter} setStartCounter={setStartCounter} />
      )}

      {/* Button to proceed to the next page (either endgame or auto scoring based on if the robot showed up) and pass in the selected data as props */}
      <ProceedBackButton
        nextPage={noShow ? `/endgame` : `/auto-scoring`}
        inputs={{
          ...(states?.inputs || {}),
          noShow: noShow,
          startCounter: startCounter,
        }}
      />

      {/* Button to go back to the previous page and pass in the selected data as props*/}
      <ProceedBackButton
        back={true}
        nextPage="/game-start"
        inputs={{
          ...(states?.inputs || {}),
          noShow: noShow,
          startCounter: startCounter,
        }}
      />
    </>
  );
};

export default AutoStartPage;
