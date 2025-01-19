import React from "react";
import { toast } from "react-toastify";

const ScoringCoralPlaceCounter = ({
  position,
  placeCount,
  setPlaceCount,
  pickPositionSelected,
  setPickPositionSelected,
  pickCounts,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        if (pickPositionSelected != "") {
          setPlaceCount(placeCount + 1);
          pickCounts.find((pickCount) => {
            if (pickCount.position == pickPositionSelected) {
              pickCount.setCount(pickCount.count + 1);
            }
          });
          setPickPositionSelected("");
        }
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(133, 133, 133, .50)",
          border: "0.5dvw solid #1D1E1E",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "2dvh",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "5dvh",
            fontWeight: "bold",
            paddingLeft: "1dvw",
          }}
        >
          {position}
        </h1>
        <h1
          style={{
            color: "white",
            fontSize: "7dvh",
            fontWeight: "bold",
            paddingRight: "1dvw",
          }}
        >
          {placeCount}
        </h1>
      </div>
    </div>
  );
};

export default ScoringCoralPlaceCounter;
