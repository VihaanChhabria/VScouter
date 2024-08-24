import React, { useEffect, useState } from "react";

const InitialSelectAlliance = ({ coordX = 1.07, coordY = 2.33, currentAlliance, setAlliance }) => {
  const [redSelected, setRedSelected] = useState(currentAlliance === "red");
  const [blueSelected, setBlueSelected] = useState(currentAlliance === "blue");

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
          width: "28.13vw",
          height: "37.2vh",
          backgroundColor: "#242424",
          borderRadius: "3.49vh",
          position: "absolute", // Set position to absolute
          top: `${coordY}vh`, // Set top coordinate
          left: `${coordX}vw`, // Set left coordinate
        }}
      >
        {/* Text */}
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58vh",
            fontWeight: "bold",
            paddingLeft: "2.15vw",
            paddingTop: "0.47vh",
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
              border: `${redSelected ? "4.65vh" : "0.93vh"} solid #1D1E1E`,
              borderRadius: "2.33vh",
              width: "11.59vw",
              height: "25.12vh",
              marginLeft: "1.73vw",
              marginRight: "1.07vw",
            }}
            onClick={() => clickAlliance("red")}
          ></div>
          {/* Blue */}
          <div
            style={{
              backgroundColor: "#00008B",
              width: "11.59vw",
              height: "25.12vh",
              border: `${blueSelected ? "4.65vh" : "0.93vh"} solid #1D1E1E`,
              borderRadius: "2.33vh",
            }}
            onClick={() => clickAlliance("blue")}
          ></div>
        </div>
      </div>
    </>
  );
};

export default InitialSelectAlliance;
