import React, { useState } from "react";

const AutoScoringNoteStatus = (coordX = 0, coordY = 0) => {
  const [status, setStatus] = useState("Not Picked");
  const baseStyle = {
    position: "absolute",
    left: `${coordX}vw`,
    top: `${coordY}vh`,
    width: "21.67vw",
    height: "17.44vh",
    border: "1.16vh solid #5A5A5A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    backgroundColor:
      status == "Picked And Shot"
        ? "rgba(174, 243, 142, 0.5)"
        : status == "Failed Pick/Shot"
        ? "rgba(255, 149, 149, 0.5)"
        : "rgba(217, 217, 217, 0.5)",
    userSelect: "none",
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
        <h1 style={{ color: "#000000", fontSize: "5.58vh", fontWeight: "bold" }}>{status}</h1>
      </div>
    </>
  );
};

export default AutoScoringNoteStatus;
