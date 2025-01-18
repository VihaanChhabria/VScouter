import React from "react";
import AutoScoringAlgaePlaceButton from "./AutoScoringAlgaePlaceButton";

import NetShotIcon from "../../../assets/AutoScoringImages/NetShotIcon.svg";
import ProcessorIcon from "../../../assets/AutoScoringImages/ProcessorIcon.svg";
import DropMissIcon from "../../../assets/AutoScoringImages/DropMissIcon.svg";

const AutoScoringAlgaePlace = ({
  pickPositionSelected,
  setPickPositionSelected,
  placeCounts,
  pickCounts,
}) => {
  const positionIcons = [NetShotIcon, ProcessorIcon, DropMissIcon];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1dvw",
      }}
    >
      {["Net Shot", "Processor", "Drop/Miss"].map((position, index) => (
        <div style={{ width: "100%", height: "100%", flex: 1 }} key={index}>
          <AutoScoringAlgaePlaceButton
            position={position}
            icon={positionIcons[index]}
            placeCount={placeCounts[index].count}
            setPlaceCount={placeCounts[index].setCount}
            pickPositionSelected={pickPositionSelected}
            setPickPositionSelected={setPickPositionSelected}
            pickCounts={pickCounts}
          />
        </div>
      ))}
    </div>
  );
};

export default AutoScoringAlgaePlace;
