import React, { useState } from "react";

import blueField from "../../assets/AutoStartMapImages/Blue_Alliance.png";
import redField from "../../assets/AutoStartMapImages/Red_Alliance.png";

import AutoStartNumberSection from "./AutoStartNumberSection";

/**
 * Renders a map for where the robot starts.
 * The map can be flipped between blue and red alliances, and it includes a flip button to rotate based on perspective.
 *
 * @param {number} buttonCoordX - x-coordinate of the flip button
 * @param {number} buttonCoordY - y-coordinate of the flip button
 * @param {string} alliance - alliance of the map (either "blue" or "red")
 * @return {JSX.Element} The rendered component.
 */
const AutoStartMap = ({ buttonCoordX = 65.02, buttonCoordY = 36.74, alliance = "blue" }) => {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      {/* Render the map for the robot to start */}
      <div
        style={{
          backgroundImage: `url(${alliance == "blue" ? blueField : redField})`,
          backgroundSize: "cover",
          width: "45.06vw",
          height: "100.0vh",
          animationName: rotate ? "rotateRight" : "rotateLeft",
          animationDuration: "400ms",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
          position: "absolute",
          left: "0vw",
          top: "0vh",
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

export default AutoStartMap;
