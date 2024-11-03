import React, { useState } from "react";

const AutoScoringNoteStatus = ({
  coordX = 0,
  coordY = 0,
  rotated = false,
  status,
  setStatus,
}) => {
  const baseStyle = {
    position: "absolute",
    left: `${coordX}dvw`,
    top: `${coordY}dvh`,
    width: "21.67dvw",
    height: "17.44dvh",
    border: "1.16dvh solid #5A5A5A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      status == "Picked And Shot"
        ? "rgba(174, 243, 142, 0.5)"
        : status == "Failed Pick/Shot"
        ? "rgba(255, 149, 149, 0.5)"
        : "rgba(217, 217, 217, 0.5)",
    userSelect: "none",
    transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };

  const changeStatus = () => {
    if (status == "Not Picked") {
      setStatus("Picked And Shot");
    } else if (status == "Picked And Shot") {
      setStatus("Failed Pick/Shot");
    } else if (status == "Failed Pick/Shot") {
      setStatus("Not Picked");
    }
  };
  return (
    <>
      <div style={baseStyle} onClick={changeStatus}>
        <h1
          style={{ color: "#000000", fontSize: "5.0dvh", fontWeight: "bold", textAlign: "center" }}
        >
          {status}
        </h1>
      </div>
    </>
  );
};

export default AutoScoringNoteStatus;
