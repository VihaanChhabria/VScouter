import React, { useState } from "react";

import fieldMap from "../../assets/FieldMap.png";

import AutoStartNumberSection from "./AutoStartNumberSection";
import ToggleButton from "../ToggleButton";

/**
 * Renders a map for where the robot starts.
 * The map can be flipped between blue and red alliances, and it includes a flip button to rotate based on perspective.
 *
 * @param {number} buttonCoordX - x-coordinate of the flip button
 * @param {number} buttonCoordY - y-coordinate of the flip button
 * @param {string} alliance - alliance of the map (either "blue" or "red")
 * @return {JSX.Element} The rendered component.
 */
const AutoStartMap = ({ startPoses, setStartPoses }) => {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      {/* Render the map for the robot to start */}
      <div
        style={{
          backgroundImage: `url(${fieldMap})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
            width: "50%",
          }}
        >
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={0} startPoses={startPoses} setStartPoses={setStartPoses} />
          </div>
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={1} startPoses={startPoses} setStartPoses={setStartPoses}/>
          </div>
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={2} startPoses={startPoses} setStartPoses={setStartPoses}/>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
            width: "50%",
          }}
        >
          {" "}
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={3} startPoses={startPoses} setStartPoses={setStartPoses}/>
          </div>
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={4} startPoses={startPoses} setStartPoses={setStartPoses}/>
          </div>
          <div style={{ height: "100%", width: "50%" }}>
            <AutoStartNumberSection number={5} startPoses={startPoses} setStartPoses={setStartPoses}/>
          </div>
        </div>
        {/* Render the numbers for the robot to start */}
        {/* <AutoStartNumberSection
          number="1"
          coordX={0}
          coordY={10.7}
          width={12.66}
          height={16.51}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="2"
          coordX={0}
          coordY={27.21}
          width={12.66}
          height={13.26}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="3"
          coordX={0}
          coordY={40.47}
          width={12.66}
          height={18.37}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="4"
          coordX={0}
          coordY={58.84}
          width={12.66}
          height={18.37}
          rotated={rotate}
        /> */}
      </div>

      {/* Flip Button */}
      {/* <ToggleButton
        coordX={buttonCoordX}
        coordY={buttonCoordY}
        width={33.8}
        height={23.72}
        question="Flip Field"
        state={rotate}
        setState={setRotate}
      /> */}
    </>
  );
};

export default AutoStartMap;
