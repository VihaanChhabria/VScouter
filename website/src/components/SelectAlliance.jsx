import React, { useEffect, useState } from "react";

const SelectAlliance = ({ coordX = 10, coordY = 10, setAlliance }) => {
  const [redSelected, setRedSelected] = useState(false);
  const [blueSelected, setBlueSelected] = useState(false);

  const clickAlliance = (alliance) => {
    if (alliance === "red") {
      setRedSelected(!redSelected);
      setBlueSelected(false);
    } else if (alliance === "blue") {
      setBlueSelected(!blueSelected);
      setRedSelected(false);
    }
  };

  useEffect(() => {
    if (redSelected && !blueSelected) {
      setAlliance("red");
    } else if (!redSelected && blueSelected) {
      setAlliance("blue");
    } else {
      setAlliance(null);
    }
  }, [redSelected, blueSelected]);

  return (
    <>
      {/* Container */}
      <div
        style={{
          border: "4px solid #1D1E1E",
          width: "262.16px",
          height: "159.97px",
          backgroundColor: "#242424",
          borderRadius: "15px",
          position: "absolute", // Set position to absolute
          top: `${coordX}px`, // Set top coordinate
          left: `${coordY}px`, // Set left coordinate
        }}
      >
        {/* Text */}
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "24px",
            fontWeight: "bold",
            paddingLeft: "20px",
            paddingTop: "2px",
          }}
        >
          Select Alliance
        </h1>

        {/* Selectors */}
        <div style={{ display: "flex" }}>
          {/* Red */}
          <div
            style={{
              backgroundColor: "#C80000",
              border: `${redSelected ? "20px" : "4px"} solid #1D1E1E`,
              borderRadius: "10px",
              width: "108px",
              height: "108px",
              marginLeft: "16.085px",
              marginRight: "9.99px",
            }}
            onClick={() => clickAlliance("red")}
          ></div>
          {/* Blue */}
          <div
            style={{
              backgroundColor: "#00008B",
              width: "108px",
              height: "108px",
              border: `${blueSelected ? "20px" : "4px"} solid #1D1E1E`,
              borderRadius: "10px",
            }}
            onClick={() => clickAlliance("blue")}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SelectAlliance;
