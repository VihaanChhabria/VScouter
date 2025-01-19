import React from "react";

const ScoringAlgaePlaceButton = ({
  position,
  icon,
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
        backgroundColor: "#242424",
        border: "1.63dvh solid #1D1E1E",
        borderRadius: "2dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        if (pickPositionSelected != "") {
          (pickPositionSelected);
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
      <h1 style={{ color: "white", fontSize: "3.75dvh", fontWeight: "700" }}>
        {position}
      </h1>

      <div
        style={{
          width: "95%",
          height: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5dvw",
        }}
      >
        <img
          src={icon}
          style={{
            width: "auto",
            height: "70%",
            filter: "invert(1)",
          }}
        />
        <h1 style={{ color: "white", fontSize: "6.75dvh", fontWeight: "bold" }}>
          {placeCount}
        </h1>
      </div>
    </div>
  );
};

export default ScoringAlgaePlaceButton;
