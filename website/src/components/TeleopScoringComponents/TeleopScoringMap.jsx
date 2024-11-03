import React, { useState } from "react";

import blueField from "../../assets/TeleopScoringMapImages/Blue_Alliance.png";
import redField from "../../assets/TeleopScoringMapImages/Red_Alliance.png";

import TeleopScoringCounter from "./TeleopScoringCounter";
import ToggleButton from "../ToggleButton";

/**
 * Renders a map for where the robot scores
 *
 * Has a remove button to remove the accidental increases in the counts.
 *
 * The map can be flipped between blue and red alliances, and it includes a flip button to rotate based on perspective.
 *
 * Collects information about the number of rings each robot made and missed in the amp, speaker and when feeding.
 *
 * @prop {number} flipButtonCoordX - The x-coordinate of the flip button.
 * @prop {number} flipButtonCoordY - The y-coordinate of the flip button.
 * @prop {number} removeButtonCoordX - The x-coordinate of the remove button.
 * @prop {number} removeButtonCoordY - The y-coordinate of the remove button.
 * @prop {string} alliance - The alliance color selected.
 * @prop {object} counts - An object containing the current counts for each scoring category.
 * @prop {object} setCounts - An object containing functions to update the counts for each scoring category.
 * @return {JSX.Element} The rendered component.
 */
const TeleopScoringMap = ({
  flipButtonCoordX = 65.02,
  flipButtonCoordY = 36.74,
  removeButtonCoordX = 65.02,
  removeButtonCoordY = 11.33,
  alliance = "blue",
  counts,
  setCounts,
}) => {
  const [rotate, setRotate] = useState(false);
  const [remove, setRemove] = useState(false);

  // Info for the scoring counters
  const counterInfo = [
    {
      coordX: 4.5,
      coordY: 10.7,
      width: 15,
      height: 37.9,
      type: "Amp",
    },
    {
      coordX: 4.5,
      coordY: 48.6,
      width: 15,
      height: 51.5,
      type: "Speaker",
    },
    {
      coordX: 34.5,
      coordY: 10.7,
      width: 14.45,
      height: 89.4,
      type: "Fed",
    },
  ];

  return (
    <>
      {/* The map and the scoring counters */}
      <div
        style={{
          backgroundImage: `url(${alliance == "blue" ? blueField : redField})`,
          backgroundSize: "63.41dvw 100dvh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "63.41dvw",
          height: "100.0dvh",
          animationName: rotate ? "rotateRight" : "rotateLeft",
          animationDuration: "400ms",
          transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
          position: "absolute",
          left: "0dvw",
          top: "0dvh",
        }}
      >
        {/* Generating the scoring counters */}
        {counterInfo.map((countInfo, index) => (
          <div key={index}>
            {/* Made Counter */}
            <TeleopScoringCounter
              coordX={countInfo.coordX}
              coordY={countInfo.coordY}
              width={countInfo.width}
              height={countInfo.height}
              message={countInfo.type + " Made:"}
              backgroundColor="rgba(174, 243, 142, 0.5)"
              rotated={rotate}
              removed={remove}
              setRemoved={setRemove}
              count={counts[index][0]}
              setCount={setCounts[index][0]}
              key={index + "0"}
            />

            {/* Missed Counter */}
            <TeleopScoringCounter
              coordX={countInfo.coordX + countInfo.width}
              coordY={countInfo.coordY}
              width={countInfo.width}
              height={countInfo.height}
              message={countInfo.type + " Missed:"}
              backgroundColor="rgba(255, 149, 149, 0.5)"
              rotated={rotate}
              removed={remove}
              setRemoved={setRemove}
              count={counts[index][1]}
              setCount={setCounts[index][1]}
              key={index + "1"}
            />
          </div>
        ))}
      </div>

      {/* The flip button */}
      <ToggleButton
        coordX={flipButtonCoordX}
        coordY={flipButtonCoordY}
        width={33.8}
        height={23.72}
        question="Flip Field"
        state={rotate}
        setState={setRotate}
      />

      {/* The remove button */}
      <ToggleButton
        coordX={removeButtonCoordX}
        coordY={removeButtonCoordY}
        width={33.8}
        height={23.72}
        question="Remove Count"
        state={remove}
        setState={setRemove}
      />
    </>
  );
};

export default TeleopScoringMap;
