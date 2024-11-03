import React, { useState } from "react";

import blueField from "../../assets/AutoStartMapImages/Blue_Alliance.png";
import redField from "../../assets/AutoStartMapImages/Red_Alliance.png";

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
const AutoStartMap = ({
  buttonCoordX = 65.02,
  buttonCoordY = 36.74,
  alliance = "blue",
}) => {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      {/* Render the map for the robot to start */}
      <div
        style={{
          backgroundImage: `url(${alliance == "blue" ? blueField : redField})`,
          backgroundSize: "cover",
          width: "45.06dvw",
          height: "100dvh",
          animationName: rotate ? "rotateRight" : "rotateLeft",
          animationDuration: "400ms",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
          position: "absolute",
          left: "0dvw",
          top: "0dvh",
        }}
      >
        {/* Render the numbers for the robot to start */}
        <AutoStartNumberSection
          number="1"
          coordX={alliance == "blue" ? 4.72 : 27.47}
          coordY={10.7}
          width={12.66}
          height={16.51}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="2"
          coordX={alliance == "blue" ? 4.72 : 27.47}
          coordY={27.21}
          width={12.66}
          height={13.26}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="3"
          coordX={alliance == "blue" ? 4.72 : 27.47}
          coordY={40.47}
          width={12.66}
          height={18.37}
          rotated={rotate}
        />
        <AutoStartNumberSection
          number="4"
          coordX={alliance == "blue" ? 4.72 : 27.47}
          coordY={58.84}
          width={12.66}
          height={18.37}
          rotated={rotate}
        />
      </div>

      {/* Flip Button */}
      <ToggleButton
        coordX={buttonCoordX}
        coordY={buttonCoordY}
        width={33.8}
        height={23.72}
        question="Flip Field"
        state={rotate}
        setState={setRotate}
      />
    </>
  );
};

export default AutoStartMap;
