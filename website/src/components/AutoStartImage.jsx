import React, { useState } from "react";

import blueField from "../assets/Blue_Alliance_Auto_Start.png";

import AutoStartNumberSection from "./AutoStartNumberSection";

const AutoStartImage = ({ buttonCoordX = 606, buttonCoordY = 158}) => {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${blueField})`,
          width: "420px",
          height: "430px",
          animationName: rotate ? "rotateRight" : "rotateLeft",
          animationDuration: "400ms",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <AutoStartNumberSection
          number="1"
          coordX={46}
          coordY={46}
          width={118}
          height={71}
          rotate={rotate}
        />
        <AutoStartNumberSection
          number="2"
          coordX={46}
          coordY={117}
          width={118}
          height={57}
          rotate={rotate}
        />
        <AutoStartNumberSection
          number="3"
          coordX={46}
          coordY={174}
          width={118}
          height={79}
          rotate={rotate}
        />
        <AutoStartNumberSection
          number="4"
          coordX={46}
          coordY={253}
          width={118}
          height={79}
          rotate={rotate}
        />
      </div>

      <div
        style={{
          width: "315px",
          height: "102px",
          backgroundColor: "#4A4A4A",
          border: `${rotate ? "20" : "7"}px solid #1D1E1E`,
          borderRadius: "15px",
          position: "absolute",
          left: `${buttonCoordX}px`,
          top: `${buttonCoordY}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setRotate(!rotate)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>Flip Field</h1>
      </div>
    </>
  );
};

export default AutoStartImage;
