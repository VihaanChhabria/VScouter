import React from "react";

const ToggleButton = ({
  coordX = 0,
  coordY = 0,
  width = 10,
  height = 10,
  question = "Question",
  state,
  setState,
}) => {
  return (
    <>
      <div
        style={{
          width: `${width}vw`,
          height: `${height}vh`,
          backgroundColor: "#4A4A4A",
          border: `${state ? "4.65" : "1.63"}vh solid #1D1E1E`,
          borderRadius: "3.49vh",
          position: "absolute",
          left: `${coordX}vw`,
          top: `${coordY}vh`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setState(!state)}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>{question}</h1>
      </div>
    </>
  );
};

export default ToggleButton;
