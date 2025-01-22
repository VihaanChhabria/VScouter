import React, { useState } from "react";

import fieldMap from "../../assets/FieldMap.png";

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
          borderRadius: "4dvh",
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
      </div>
    </>
  );
};

export default AutoStartMap;
