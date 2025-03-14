import React, { useState } from "react";

import fieldMapBlue from "../../assets/FieldMaps/FieldMapBlue.png";
import fieldMapRed from "../../assets/FieldMaps/FieldMapRed.png";

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
const AutoStartMap = ({ startPoses, setStartPoses, alliance}) => {
  return (
    <>
      {/* Render the map for the robot to start */}
      <div
        style={{
          backgroundImage: `url(${alliance=="redAlliance" ? fieldMapRed : fieldMapBlue})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4dvh",
        }}
      >
        <div style={{
            width: "77.67%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {[0, 1, 2, 3, 4,].map((value, index) => {
            return (
              <div style={{ height: "50%", width: "50%" }} key={index}>
                <AutoStartNumberSection
                  number={index}
                  startPoses={startPoses}
                  setStartPoses={setStartPoses}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AutoStartMap;
