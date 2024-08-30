import React from "react";

const SettingsButton = ({
  width = 90,
  height = 15,
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
          border: "1.63vh solid #1D1E1E",
          borderRadius: "3.49vh",
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

export default SettingsButton;
