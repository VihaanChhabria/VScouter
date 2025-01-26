import React, { useEffect, useState } from "react";

/**
 * Renders a component for selecting an alliance.
 *
 * @param {number} props.coordX - The x-coordinate of the component.
 * @param {number} props.coordY - The y-coordinate of the component.
 * @param {string} props.currentAlliance - The current alliance.
 * @param {function} props.setAlliance - The function to set the alliance.
 * @return {JSX.Element} The rendered component.
 */
const InitialSelectAlliance = ({ currentAlliance, setAlliance }) => {
  const [redSelected, setRedSelected] = useState(currentAlliance === "red");
  const [blueSelected, setBlueSelected] = useState(currentAlliance === "blue");

  /**
   * Click handler for the alliance selection.
   * @param {string} alliance - The alliance to select.
   */
  const clickAlliance = (alliance) => {
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH");
    
    if (alliance === "red") {
      setRedSelected(!redSelected);
      setBlueSelected(false);
    } else if (alliance === "blue") {
      setBlueSelected(!blueSelected);
      setRedSelected(false);
    }
  };

  /**
   * Updates the alliance state based on the selected value.
   */
  useEffect(() => {
    if (redSelected && !blueSelected) {
      setAlliance("redAlliance");
    } else if (!redSelected && blueSelected) {
      setAlliance("blueAlliance");
    } else {
      setAlliance(null);
    }
  }, [redSelected, blueSelected]);

  return (
    <>
      {/* Container */}
      <div
        style={{
          border: "1.3dvh solid #1D1E1E",
          width: "100%",
          height: "100%",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "1dvw",
          paddingBottom: "2dvh",
        }}
      >
        {/* Text */}
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "5.58dvh",
            fontWeight: "bold",
          }}
        >
          Select Alliance
        </h1>

        {/* Selectors */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "97%",
            gap: "0.5dvw",
          }}
        >
          {/* Red */}
          <div
            style={{
              backgroundColor: "#C80000",
              boxShadow: `0px 0px 0px ${redSelected ? "4.65dvh #F7B900" : "0.93dvh #1D1E1E"} inset`,
              borderRadius: "2.33dvh",
              height: "25.12dvh",
              flexGrow: 1,
            }}
            onClick={() => clickAlliance("red")}
          ></div>
          {/* Blue */}
          <div
            style={{
              backgroundColor: "#00008B",
              height: "25.12dvh",
              boxShadow: `0px 0px 0px ${blueSelected ? "4.65dvh #F7B900" : "0.93dvh #1D1E1E"} inset`,
              borderRadius: "2.33dvh",
              flexGrow: 1,
            }}
            onClick={() => clickAlliance("blue")}
          ></div>
        </div>
      </div>
    </>
  );
};

export default InitialSelectAlliance;
