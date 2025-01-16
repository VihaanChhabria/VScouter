import React from "react";

const AutoScoringCoralPickupButton = ({
  location,
  selected = false,
  setSelected = () => {},
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: selected ? "#507144" : "#242424",
        border: "1.63dvh solid #1D1E1E",
        borderRadius: "2dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => setSelected(location)}
    >
      <h1 style={{ color: "white", fontSize: "3.25dvh", fontWeight: "700" }}>{location}</h1>
    </div>
  );
};

export default AutoScoringCoralPickupButton;
